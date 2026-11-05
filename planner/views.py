"""行程小幫手 API（JSON）與邀請 / 分享頁面"""
import json
import logging
from datetime import datetime, timedelta
from urllib.parse import urlencode

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.utils import timezone
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from notifications.push import send_to_users

from .importer import ImportError_, import_line_export
from .models import Group, GroupInvitation, GroupMember, Itinerary

logger = logging.getLogger(__name__)
User = get_user_model()

HISTORY_LIMIT = 100
MAX_LINKS = 10


def notify(users, title, body, tag, url="/?tab=plan"):
    """發推播；失敗只記錄，不影響原本的操作"""
    users = [u for u in users if u]
    if not users:
        return
    try:
        send_to_users(users, title, body, url=url, tag=tag)
    except Exception:
        logger.exception("推播通知失敗：%s", title)


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
        "groups": [{"id": g.id, "name": g.name} for g in it.groups.all()],
        "creator": it.creator.username,
        "is_mine": it.creator_id == user.id,
        "can_manage": it.can_manage(user),
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


def _pick_groups(it, data, user):
    """要分享的群組（可多選）。只能選自己有加入的群組；編輯時，自己沒加入的群組維持原樣"""
    try:
        wanted = {int(g) for g in (data.get("group_ids") or [])}
    except (TypeError, ValueError) as exc:
        raise InvalidInput("群組資料錯誤") from exc
    mine = set(GroupMember.objects.filter(user=user).values_list("group_id", flat=True))
    if wanted - mine:
        raise InvalidInput("你不是這個群組的成員")
    keep_others = set(it.groups.exclude(pk__in=mine).values_list("pk", flat=True)) if it.pk else set()
    return wanted | keep_others


def _visible_qs(user):
    return Itinerary.visible_to(user).select_related("creator").prefetch_related("groups")


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
            group_ids = _pick_groups(it, data, user)
        except InvalidInput as exc:
            return _error(str(exc))
        with transaction.atomic():
            it.save()
            it.groups.set(group_ids)
        if group_ids:
            groups = list(it.groups.all())
            others = list(it.recipients().exclude(pk=user.pk))
            local = timezone.localtime(it.date_time) if it.date_time else None
            when = f"{local.month}/{local.day} {local:%H:%M}" if local else "時間未定"
            names = "、".join(g.name for g in groups)
            notify(others, f"👥 {names} 有新行程", f"{user.username} 新增了「{it.title}」（{when}）", f"group-itinerary-{it.pk}")
        return JsonResponse({"ok": True, "item": serialize(it, user, request)})

    now = timezone.now()
    qs = _visible_qs(user).exclude(hidden_by=user)
    upcoming = qs.filter(date_time__gte=now).order_by("date_time")
    tbd = qs.filter(date_time__isnull=True).order_by("-created_at")
    history = qs.filter(date_time__lt=now).order_by("-date_time")[:HISTORY_LIMIT]
    groups = Group.objects.filter(members__user=user).order_by("name")
    invitations = GroupInvitation.objects.filter(invitee=user).select_related("group", "inviter").order_by("-created_at")
    return JsonResponse({
        "invitations": [{"id": i.id, "group": i.group.name, "inviter": i.inviter.username if i.inviter else "有人"} for i in invitations],
        "upcoming": [serialize(i, user, request) for i in upcoming],
        "tbd": [serialize(i, user, request) for i in tbd],
        "history": [serialize(i, user, request) for i in history],
        "groups": [{"id": g.id, "name": g.name} for g in groups],
        "personal_count": qs.filter(groups__isnull=True).count(),
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
        data = _json_body(request)
        _apply_fields(it, data, request.user)
        group_ids = _pick_groups(it, data, request.user)
    except InvalidInput as exc:
        return _error(str(exc))
    it.is_notified = False   # 時間或提醒改了，重新提醒
    with transaction.atomic():
        it.save()
        it.groups.set(group_ids)
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
        "pending": [i.invitee.username for i in g.invitations.select_related("invitee")],
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


# ---------- 邀請已註冊的會員 ----------
SEARCH_LIMIT = 10


@login_required
@require_GET
def search_users(request):
    """用帳號名稱搜尋會員（至少 2 個字，最多 10 筆），邀請進群組用"""
    q = (request.GET.get("q") or "").strip()
    group_id = request.GET.get("group")
    if len(q) < 2:
        return JsonResponse({"users": []})
    qs = User.objects.filter(username__icontains=q, is_active=True).exclude(pk=request.user.pk)
    if group_id:
        qs = qs.exclude(plan_groups__group_id=group_id)
    pending = set(GroupInvitation.objects.filter(group_id=group_id).values_list("invitee_id", flat=True)) if group_id else set()
    users = list(qs.order_by("username")[:SEARCH_LIMIT])
    return JsonResponse({"users": [{"username": u.username, "invited": u.pk in pending} for u in users]})


@login_required
@require_POST
def group_invite(request, pk):
    group = get_object_or_404(Group, pk=pk, members__user=request.user)
    try:
        username = (_json_body(request).get("username") or "").strip()
    except InvalidInput as exc:
        return _error(str(exc))
    invitee = User.objects.filter(username=username, is_active=True).first()
    if not invitee:
        return _error("找不到這個會員")
    if group.members.filter(user=invitee).exists():
        return _error(f"{invitee.username} 已經在群組裡了")
    inv, created = GroupInvitation.objects.get_or_create(group=group, invitee=invitee, defaults={"inviter": request.user})
    if not created:
        return _error(f"已經邀請過 {invitee.username}，等對方回覆")
    notify([invitee], "📨 群組邀請", f"{request.user.username} 邀請你加入「{group.name}」，點這裡回覆", f"invite-{group.pk}",
           url=f"/?tab=plan&invite={inv.pk}")
    return JsonResponse({"ok": True})


@login_required
@require_POST
def invitation_accept(request, pk):
    inv = get_object_or_404(GroupInvitation.objects.select_related("group", "inviter"), pk=pk, invitee=request.user)
    GroupMember.objects.get_or_create(group=inv.group, user=request.user)
    inviter, group = inv.inviter, inv.group
    inv.delete()
    notify([inviter], f"✅ {request.user.username} 加入了群組", f"{request.user.username} 接受邀請，加入「{group.name}」", f"joined-{group.pk}")
    return JsonResponse({"ok": True})


@login_required
@require_POST
def invitation_decline(request, pk):
    get_object_or_404(GroupInvitation, pk=pk, invitee=request.user).delete()
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
        GroupInvitation.objects.filter(group=group, invitee=request.user).delete()
        return redirect(f"{reverse('player:home')}?tab=plan")
    return render(request, "planner/join.html", {
        "group": group, "is_member": is_member,
        "members": group.members.select_related("user").order_by("joined_at"),
    })


@login_required
@require_http_methods(["GET", "POST"])
def share(request, token):
    """分享出去的行程邀約：登入後按「加入這個行程」就看得到，也會收到提醒"""
    it = get_object_or_404(Itinerary.objects.select_related("creator"), share_token=token)
    already = it.recipients().filter(pk=request.user.pk).exists()
    if request.method == "POST":
        if not already:
            it.interested.add(request.user)
        return redirect(f"{reverse('player:home')}?tab=plan")
    return render(request, "planner/share.html", {
        "it": it,
        "groups": it.groups.all(),
        "already": already,
        "gcal_url": _gcal_url(it),
    })


@login_required
@require_http_methods(["GET", "POST"])
def import_itineraries(request):
    """上傳 LINE 版行程小幫手的匯出檔，匯入成 Ukiyo 的群組行程"""
    context = {}
    if request.method == "POST":
        upload = request.FILES.get("file")
        if not upload:
            context["error"] = "請選擇要上傳的檔案"
        else:
            try:
                group, imported, skipped = import_line_export(request.user, upload.read())
                context.update(done=True, group=group, imported=imported, skipped=skipped)
            except ImportError_ as exc:
                context["error"] = str(exc)
    return render(request, "planner/import.html", context)
