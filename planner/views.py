"""行程小幫手 API（JSON）與邀請 / 分享頁面"""
import json
from datetime import datetime, timedelta
from urllib.parse import urlencode

from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from .models import Group, GroupMember, Itinerary

HISTORY_LIMIT = 100
MAX_LINKS = 10


class InvalidInput(Exception):
    pass


def _json_body(request):
    try:
        return json.loads(request.body or "{}")
    except ValueError as exc:
        raise InvalidInput("資料格式錯誤") from exc


def _error(message, status=400):
    return JsonResponse({"ok": False, "error": message}, status=status)


def _parse_dt(value):
    """接受 datetime-local 的 'YYYY-MM-DDTHH:MM'（台灣時間），空字串代表時間未定"""
    if not value:
        return None
    try:
        dt = datetime.fromisoformat(value)
    except ValueError as exc:
        raise InvalidInput("時間格式錯誤") from exc
    return timezone.make_aware(dt) if timezone.is_naive(dt) else dt


def _gcal_url(it):
    """Google 日曆新增活動的網址（沒有時間就不提供）；預設長度 1 小時"""
    if not it.date_time:
        return ""
    start = timezone.localtime(it.date_time)
    fmt = "%Y%m%dT%H%M%S"
    details = it.notes
    for link in it.links:
        details += f"\n{link.get('title') or ''} {link.get('url')}"
    return "https://calendar.google.com/calendar/render?" + urlencode({
        "action": "TEMPLATE",
        "text": it.title,
        "dates": f"{start.strftime(fmt)}/{(start + timedelta(hours=1)).strftime(fmt)}",
        "ctz": "Asia/Taipei",
        "location": it.location,
        "details": details.strip(),
    })


def serialize(it, user, request):
    interested = list(it.interested.all())
    return {
        "id": it.id,
        "title": it.title,
        "type": it.activity_type,
        "type_label": it.get_activity_type_display(),
        "date_time": timezone.localtime(it.date_time).strftime("%Y-%m-%dT%H:%M") if it.date_time else "",
        "location": it.location,
        "notes": it.notes,
        "links": it.links,
        "notify_minutes_before": it.notify_minutes_before,
        "notify_label": dict(Itinerary.NOTIFY_CHOICES).get(it.notify_minutes_before, f"{it.notify_minutes_before} 分鐘前"),
        "group": {"id": it.group_id, "name": it.group.name} if it.group_id else None,
        "creator": it.creator.username,
        "is_mine": it.creator_id == user.id,
        "can_manage": it.can_manage(user),
        "interested": [u.username for u in interested],
        "i_am_interested": any(u.id == user.id for u in interested),
        "share_url": request.build_absolute_uri(reverse("planner:share", args=[it.share_token])),
        "gcal_url": _gcal_url(it),
    }


def _apply_fields(it, data, user):
    title = (data.get("title") or "").strip()
    if not title:
        raise InvalidInput("請輸入標題")
    it.title = title[:100]
    if data.get("type") in Itinerary.Type.values:
        it.activity_type = data["type"]
    it.date_time = _parse_dt(data.get("date_time"))
    it.location = (data.get("location") or "").strip()[:200]
    it.notes = (data.get("notes") or "").strip()[:2000]
    links = []
    for link in (data.get("links") or [])[:MAX_LINKS]:
        url = (link.get("url") or "").strip()
        if url.startswith(("http://", "https://")):
            links.append({"title": (link.get("title") or "").strip()[:60], "url": url[:500]})
    it.links = links
    try:
        minutes = int(data.get("notify_minutes_before", it.notify_minutes_before))
    except (TypeError, ValueError):
        minutes = 1440
    it.notify_minutes_before = minutes if minutes in dict(Itinerary.NOTIFY_CHOICES) else 1440
    # 群組：只能放到自己有加入的群組
    group_id = data.get("group_id")
    if group_id:
        if not GroupMember.objects.filter(group_id=group_id, user=user).exists():
            raise InvalidInput("你不是這個群組的成員")
        it.group_id = int(group_id)
    else:
        it.group = None


def _visible_qs(user):
    return Itinerary.visible_to(user).select_related("group", "creator").prefetch_related("interested")


def _get_visible(request, pk):
    return get_object_or_404(_visible_qs(request.user), pk=pk)


# ---------- 行程 ----------
@login_required
@require_http_methods(["GET", "POST"])
def itineraries(request):
    user = request.user
    if request.method == "POST":
        try:
            data = _json_body(request)
            it = Itinerary(creator=user)
            _apply_fields(it, data, user)
        except InvalidInput as exc:
            return _error(str(exc))
        with transaction.atomic():
            it.save()
            it.interested.add(user)   # 建立者預設有興趣（參加）
        return JsonResponse({"ok": True, "item": serialize(it, user, request)})

    now = timezone.now()
    qs = _visible_qs(user).exclude(hidden_by=user)
    upcoming = qs.filter(date_time__gte=now).order_by("date_time")
    tbd = qs.filter(date_time__isnull=True).order_by("-created_at")
    history = qs.filter(date_time__lt=now).order_by("-date_time")[:HISTORY_LIMIT]
    groups = Group.objects.filter(members__user=user).order_by("name")
    return JsonResponse({
        "upcoming": [serialize(i, user, request) for i in upcoming],
        "tbd": [serialize(i, user, request) for i in tbd],
        "history": [serialize(i, user, request) for i in history],
        "groups": [{"id": g.id, "name": g.name} for g in groups],
        "notify_choices": Itinerary.NOTIFY_CHOICES,
        "types": Itinerary.Type.choices,
    })


@login_required
@require_POST
def itinerary_update(request, pk):
    it = _get_visible(request, pk)
    if not it.can_manage(request.user):
        return _error("只有建立者或群組成員可以修改", 403)
    if it.date_time and it.date_time < timezone.now():
        return _error("已經過去的行程不能修改")
    try:
        _apply_fields(it, _json_body(request), request.user)
    except InvalidInput as exc:
        return _error(str(exc))
    it.is_notified = False   # 時間或提醒改了，重新提醒
    it.save()
    return JsonResponse({"ok": True, "item": serialize(it, request.user, request)})


@login_required
@require_POST
def itinerary_delete(request, pk):
    it = _get_visible(request, pk)
    if not it.can_manage(request.user):
        return _error("只有建立者或群組成員可以刪除", 403)
    it.delete()
    return JsonResponse({"ok": True})


@login_required
@require_POST
def itinerary_interest(request, pk):
    """切換「我有興趣」"""
    it = _get_visible(request, pk)
    if it.interested.filter(pk=request.user.pk).exists():
        it.interested.remove(request.user)
    else:
        it.interested.add(request.user)
    return JsonResponse({"ok": True, "item": serialize(it, request.user, request)})


@login_required
@require_POST
def itinerary_finalize(request, pk):
    """時間未定的行程決定時間"""
    it = _get_visible(request, pk)
    if not it.can_manage(request.user):
        return _error("只有建立者或群組成員可以決定時間", 403)
    try:
        dt = _parse_dt(_json_body(request).get("date_time"))
    except InvalidInput as exc:
        return _error(str(exc))
    if not dt:
        return _error("請選擇時間")
    it.date_time = dt
    it.is_notified = False
    it.save(update_fields=["date_time", "is_notified", "updated_at"])
    return JsonResponse({"ok": True, "item": serialize(it, request.user, request)})


@login_required
@require_POST
def itinerary_hide(request, pk):
    """把歷史行程從自己的清單隱藏（不影響其他人）"""
    it = _get_visible(request, pk)
    it.hidden_by.add(request.user)
    return JsonResponse({"ok": True})


# ---------- 群組 ----------
def _group_json(g, user, request):
    members = list(g.members.select_related("user").order_by("joined_at"))
    return {
        "id": g.id,
        "name": g.name,
        "members": [m.user.username for m in members],
        "is_owner": any(m.user_id == user.id and m.is_owner for m in members),
        "invite_url": request.build_absolute_uri(reverse("planner:join", args=[g.invite_code])),
    }


@login_required
@require_http_methods(["GET", "POST"])
def groups(request):
    user = request.user
    if request.method == "POST":
        try:
            name = (_json_body(request).get("name") or "").strip()[:40]
        except InvalidInput as exc:
            return _error(str(exc))
        if not name:
            return _error("請輸入群組名稱")
        with transaction.atomic():
            g = Group.objects.create(name=name, created_by=user)
            GroupMember.objects.create(group=g, user=user, is_owner=True)
        return JsonResponse({"ok": True, "group": _group_json(g, user, request)})
    qs = Group.objects.filter(members__user=user).order_by("name")
    return JsonResponse({"groups": [_group_json(g, user, request) for g in qs]})


@login_required
@require_POST
def group_leave(request, pk):
    membership = get_object_or_404(GroupMember, group_id=pk, user=request.user)
    group = membership.group
    membership.delete()
    if not group.members.exists():
        group.delete()   # 最後一個人離開就刪除群組（群組行程變成建立者的個人行程）
    return JsonResponse({"ok": True})


# ---------- 邀請連結與分享頁（一般頁面） ----------
@login_required
@require_http_methods(["GET", "POST"])
def join_group(request, code):
    group = get_object_or_404(Group, invite_code=code)
    is_member = group.members.filter(user=request.user).exists()
    if request.method == "POST":
        if not is_member:
            GroupMember.objects.get_or_create(group=group, user=request.user)
        return redirect(f"{reverse('player:home')}?tab=plan")
    return render(request, "planner/join.html", {
        "group": group, "is_member": is_member,
        "members": group.members.select_related("user").order_by("joined_at"),
    })


@login_required
@require_http_methods(["GET", "POST"])
def share(request, token):
    """分享出去的行程邀約：登入後可以按「我有興趣」加入"""
    it = get_object_or_404(Itinerary.objects.select_related("group", "creator"), share_token=token)
    if request.method == "POST":
        it.interested.add(request.user)
        return redirect(f"{reverse('player:home')}?tab=plan")
    return render(request, "planner/share.html", {
        "it": it,
        "interested": it.interested.all(),
        "i_am_interested": it.interested.filter(pk=request.user.pk).exists(),
        "gcal_url": _gcal_url(it),
    })
