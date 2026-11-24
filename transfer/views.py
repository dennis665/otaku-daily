"""檔案互傳 API（JSON）：裝置在線回報、建立傳送、交換 WebRTC 連線資訊（offer／answer）、回報結果。
檔案本身由裝置之間直接傳，這裡只存檔名與大小。"""
import json
import logging
from datetime import timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.http import require_GET, require_POST

from accounts.names import display_name
from notifications.push import send_to_users
from planner.models import GroupMember

from .models import (DEVICE_KEEP_DAYS, KEEP_HOURS, MAX_FILE_IOS, MAX_FILES, MAX_TARGETS, MAX_TOTAL, MB,
                     NUDGE_SECONDS, ONLINE_SECONDS, WAIT_SECONDS, Device, Transfer)

logger = logging.getLogger(__name__)
User = get_user_model()

MAX_SDP = 64 * 1024
PLATFORMS = {p for p, _ in Device.PLATFORMS}


class InvalidInput(Exception):
    pass


def _error(message, status=400):
    return JsonResponse({"ok": False, "error": message}, status=status)


def _body(request):
    try:
        data = json.loads(request.body or "{}")
    except ValueError as exc:
        raise InvalidInput("資料格式錯誤") from exc
    if not isinstance(data, dict):
        raise InvalidInput("資料格式錯誤")
    return data


def _my_device(request, data):
    """依瀏覽器送來的 device_id 找到自己這台裝置（要先 poll 過才有）"""
    device = Device.objects.filter(user=request.user, device_id=str(data.get("device_id") or "")[:40]).first()
    if not device:
        raise InvalidInput("找不到這台裝置，請重新整理頁面")
    return device


def _clean_name(value):
    return " ".join(str(value or "").split())[:30]


def _device_json(d):
    return {"id": d.id, "name": d.name, "platform": d.platform, "online": d.online}


def _limits():
    return {"max_files": MAX_FILES, "max_total": MAX_TOTAL, "max_file_ios": MAX_FILE_IOS, "max_targets": MAX_TARGETS}


def _my_group_ids(user):
    return list(GroupMember.objects.filter(user=user).values_list("group_id", flat=True))


def _friend_ids(user):
    """跟我在同一個行程群組裡的其他會員"""
    return set(GroupMember.objects.filter(group_id__in=_my_group_ids(user)).exclude(user=user)
               .values_list("user_id", flat=True))


def _friends_json(user):
    """群組朋友：每位朋友所屬的群組（我也在的）與目前在線的裝置"""
    groups = list(GroupMember.objects.filter(user=user).select_related("group").order_by("group__name"))
    gids = [m.group_id for m in groups]
    members = GroupMember.objects.filter(group_id__in=gids).exclude(user=user).select_related("user")
    friends = {}
    for m in members:
        f = friends.setdefault(m.user_id, {"id": m.user_id, "name": display_name(m.user), "groups": [], "devices": []})
        f["groups"].append(m.group_id)
    online = timezone.now() - timedelta(seconds=ONLINE_SECONDS)
    for d in Device.objects.filter(user_id__in=friends, last_seen__gte=online).order_by("-last_seen"):
        friends[d.user_id]["devices"].append({"id": d.id, "name": d.name, "platform": d.platform, "online": True})
    return ([{"id": m.group_id, "name": m.group.name} for m in groups],
            sorted(friends.values(), key=lambda f: (not f["devices"], f["name"].lower())))


def _peer_name(device, viewer):
    """自己的裝置只顯示裝置名稱；朋友的顯示「暱稱（裝置）」"""
    return device.name if device.user_id == viewer.id else f"{display_name(device.user)}（{device.name}）"


def _expire(transfers):
    """對方一直沒按接收的傳送標成失敗"""
    for t in transfers:
        if t.expired:
            t.status, t.note = Transfer.FAILED, "對方沒有回應"
            t.save(update_fields=["status", "note", "updated_at"])


def _cleanup(user):
    now = timezone.now()
    Transfer.objects.filter(sender=user, created_at__lt=now - timedelta(hours=KEEP_HOURS)).delete()
    Device.objects.filter(user=user, last_seen__lt=now - timedelta(days=DEVICE_KEEP_DAYS)).delete()


@login_required
@require_POST
def poll(request):
    """App 開著時定時回報（順便更新在線狀態），回傳我的其他裝置、要給這台的檔案、這台送出的傳送狀態"""
    try:
        data = _body(request)
    except InvalidInput as e:
        return _error(str(e))
    device_id = str(data.get("device_id") or "")[:40]
    if len(device_id) < 8:
        return _error("裝置編號錯誤")
    platform = data.get("platform") if data.get("platform") in PLATFORMS else "desktop"
    device, created = Device.objects.get_or_create(
        user=request.user, device_id=device_id,
        defaults={"name": _clean_name(data.get("name")) or "我的裝置", "platform": platform},
    )
    if not created:
        device.last_seen = timezone.now()
        device.platform = platform
        device.save(update_fields=["last_seen", "platform"])

    others = Device.objects.filter(user=request.user).exclude(pk=device.pk).order_by("-last_seen")

    incoming = list(Transfer.objects.filter(to_device=device, status=Transfer.WAITING).select_related("from_device__user"))
    _expire(incoming)
    recent = timezone.now() - timedelta(minutes=5)
    outgoing = list(Transfer.objects.filter(from_device=device).filter(
        Q(status__in=[Transfer.WAITING, Transfer.ACCEPTED]) | Q(updated_at__gte=recent)).select_related("to_device__user"))
    _expire(outgoing)

    groups, friends = _friends_json(request.user)
    return JsonResponse({
        "ok": True,
        "me": _device_json(device),
        "groups": groups,
        "friends": friends,
        "devices": [_device_json(d) for d in others],
        "incoming": [{
            "id": str(t.id), "from_name": _peer_name(t.from_device, request.user), "files": t.files,
            "total_size": t.total_size, "offer": t.offer,
        } for t in incoming if t.status == Transfer.WAITING],
        "outgoing": [{
            "id": str(t.id), "to_name": _peer_name(t.to_device, request.user), "status": t.status, "note": t.note,
            "count": len(t.files), "total_size": t.total_size,
        } for t in outgoing],
        "limits": _limits(),
    })


@login_required
@require_POST
def send(request):
    """建立一次傳送：對象裝置（自己的或群組朋友的）、檔案清單（檔名、大小、類型）、這台的連線資訊 offer。
    傳給好幾台時，每台各建立一次（各自一條連線）"""
    try:
        data = _body(request)
        me = _my_device(request, data)
        allowed = Q(user=request.user) | Q(user_id__in=_friend_ids(request.user))
        to = (Device.objects.filter(allowed, pk=data.get("to")).select_related("user").first()
              if str(data.get("to") or "").isdigit() else None)
        if not to or to.pk == me.pk:
            raise InvalidInput("找不到要傳送的裝置（朋友要跟你在同一個行程群組裡）")
        now = timezone.now()
        active = Transfer.objects.filter(from_device=me).filter(
            Q(status=Transfer.WAITING, created_at__gte=now - timedelta(seconds=WAIT_SECONDS))
            | Q(status=Transfer.ACCEPTED, updated_at__gte=now - timedelta(minutes=30))).count()
        if active >= MAX_TARGETS:
            raise InvalidInput(f"同時最多傳給 {MAX_TARGETS} 台裝置，請等前面的傳完")
        if not to.online:
            raise InvalidInput(f"「{_peer_name(to, request.user)}」目前不在線上，請先在那台裝置打開 Ukiyo")
        raw = data.get("files")
        if not isinstance(raw, list) or not raw:
            raise InvalidInput("請選擇要傳的檔案")
        if len(raw) > MAX_FILES:
            raise InvalidInput(f"一次最多傳 {MAX_FILES} 個檔案")
        files = []
        for f in raw:
            if not isinstance(f, dict):
                raise InvalidInput("資料格式錯誤")
            try:
                size = int(f.get("size"))
            except (TypeError, ValueError) as exc:
                raise InvalidInput("資料格式錯誤") from exc
            name = str(f.get("name") or "").replace("/", "_").replace("\\", "_").strip()[:200] or "檔案"
            if size < 0:
                raise InvalidInput("資料格式錯誤")
            if to.platform == "ios" and size > MAX_FILE_IOS:
                raise InvalidInput(f"「{name}」太大了：傳到 iPhone／iPad 每個檔案最多 {MAX_FILE_IOS // MB} MB")
            files.append({"name": name, "size": size, "type": str(f.get("type") or "")[:100]})
        total = sum(f["size"] for f in files)
        if total > MAX_TOTAL:
            raise InvalidInput(f"一次最多傳 {MAX_TOTAL // MB} MB，請分批傳送")
        offer = str(data.get("offer") or "")
        if not offer or len(offer) > MAX_SDP:
            raise InvalidInput("連線資訊錯誤，請重新整理後再試")
    except InvalidInput as e:
        return _error(str(e))

    _cleanup(request.user)
    t = Transfer.objects.create(sender=request.user, from_device=me, to_device=to,
                                files=files, total_size=total, offer=offer)
    return JsonResponse({"ok": True, "id": str(t.id)})


def _visible(request, pk):
    """傳送端或收檔端的使用者才看得到"""
    return get_object_or_404(Transfer.objects.select_related("from_device", "to_device").filter(
        Q(sender=request.user) | Q(to_device__user=request.user)), pk=pk)


@login_required
@require_GET
def detail(request, pk):
    """傳送端等待對方接收時查詢：狀態與對方的 answer"""
    t = _visible(request, pk)
    _expire([t])
    return JsonResponse({"ok": True, "status": t.status, "note": t.note,
                         "answer": t.answer if t.status == Transfer.ACCEPTED else ""})


@login_required
@require_POST
def answer(request, pk):
    """收檔端按接收：送回這台的連線資訊 answer"""
    t = _visible(request, pk)
    try:
        data = _body(request)
        me = _my_device(request, data)
        if t.to_device_id != me.pk:
            raise InvalidInput("這不是傳給這台裝置的檔案")
        _expire([t])
        if t.status != Transfer.WAITING:
            raise InvalidInput("這次傳送已經結束了")
        sdp = str(data.get("answer") or "")
        if not sdp or len(sdp) > MAX_SDP:
            raise InvalidInput("連線資訊錯誤，請重新整理後再試")
    except InvalidInput as e:
        return _error(str(e))
    t.answer, t.status = sdp, Transfer.ACCEPTED
    t.save(update_fields=["answer", "status", "updated_at"])
    return JsonResponse({"ok": True})


@login_required
@require_POST
def set_status(request, pk):
    """回報結果：拒絕（收檔端）、取消、完成、失敗；已經結束的不再改"""
    t = _visible(request, pk)
    try:
        data = _body(request)
    except InvalidInput as e:
        return _error(str(e))
    status = data.get("status")
    allowed = {Transfer.CANCELLED, Transfer.DONE, Transfer.FAILED}
    if t.to_device.user_id == request.user.id:
        allowed.add(Transfer.DECLINED)
    if status not in allowed:
        return _error("狀態錯誤")
    if t.status not in Transfer.FINISHED:
        t.status, t.note = status, _clean_name(data.get("note"))[:100]
        t.offer = t.answer = ""   # 連線資訊用完就清掉
        t.save(update_fields=["status", "note", "offer", "answer", "updated_at"])
    return JsonResponse({"ok": True, "status": t.status})


@login_required
@require_POST
def rename(request):
    try:
        data = _body(request)
        me = _my_device(request, data)
        name = _clean_name(data.get("name"))
        if not name:
            raise InvalidInput("請輸入裝置名稱")
    except InvalidInput as e:
        return _error(str(e))
    me.name = name
    me.save(update_fields=["name"])
    return JsonResponse({"ok": True, "me": _device_json(me)})


@login_required
@require_POST
def remove_device(request, pk):
    """從清單移除不用的裝置（那台下次打開 App 會自動重新加入）"""
    get_object_or_404(Device, user=request.user, pk=pk).delete()
    return JsonResponse({"ok": True})


@login_required
@require_POST
def nudge(request):
    """群組朋友不在線上時，推播請對方打開 Ukiyo（同一位朋友 1 分鐘最多一次）"""
    try:
        data = _body(request)
        uid = int(data.get("user") or 0)
    except (InvalidInput, TypeError, ValueError):
        return _error("資料格式錯誤")
    if uid not in _friend_ids(request.user):
        return _error("只能通知同一個行程群組的朋友", 404)
    key = f"transfer-nudge:{request.user.id}:{uid}"
    if not cache.add(key, 1, NUDGE_SECONDS):
        return _error("剛剛通知過了，請稍等一下")
    friend = User.objects.get(pk=uid)
    name = display_name(request.user)
    try:
        ok, _ = send_to_users([friend], f"📲 {name} 想傳檔案給你", "打開 Ukiyo 就能接收（不用點別的地方）",
                              url="/?transfer=1", tag=f"transfer-nudge-{request.user.id}")
    except Exception:
        logger.exception("傳檔案通知失敗")
        ok = 0
    if not ok:
        return _error(f"{display_name(friend)} 沒有開啟通知，請用其他方式請對方打開 Ukiyo")
    return JsonResponse({"ok": True})
