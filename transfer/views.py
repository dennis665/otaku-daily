"""檔案互傳 API（JSON）：裝置在線回報、建立傳送、交換 WebRTC 連線資訊（offer／answer）、回報結果。
檔案本身由裝置之間直接傳，這裡只存檔名與大小。"""
import json
from datetime import timedelta

from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.http import require_GET, require_POST

from .models import (DEVICE_KEEP_DAYS, KEEP_HOURS, MAX_FILE_IOS, MAX_FILES, MAX_TOTAL, MB, Device,
                     Transfer)

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
    return {"max_files": MAX_FILES, "max_total": MAX_TOTAL, "max_file_ios": MAX_FILE_IOS}


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

    incoming = list(Transfer.objects.filter(to_device=device, status=Transfer.WAITING).select_related("from_device"))
    _expire(incoming)
    recent = timezone.now() - timedelta(minutes=5)
    outgoing = list(Transfer.objects.filter(from_device=device).filter(
        Q(status__in=[Transfer.WAITING, Transfer.ACCEPTED]) | Q(updated_at__gte=recent)).select_related("to_device"))
    _expire(outgoing)

    return JsonResponse({
        "ok": True,
        "me": _device_json(device),
        "devices": [_device_json(d) for d in others],
        "incoming": [{
            "id": str(t.id), "from_name": t.from_device.name, "files": t.files,
            "total_size": t.total_size, "offer": t.offer,
        } for t in incoming if t.status == Transfer.WAITING],
        "outgoing": [{
            "id": str(t.id), "to_name": t.to_device.name, "status": t.status, "note": t.note,
            "count": len(t.files), "total_size": t.total_size,
        } for t in outgoing],
        "limits": _limits(),
    })


@login_required
@require_POST
def send(request):
    """建立一次傳送：對象裝置、檔案清單（檔名、大小、類型）、這台的連線資訊 offer"""
    try:
        data = _body(request)
        me = _my_device(request, data)
        to = Device.objects.filter(user=request.user, pk=data.get("to")).first() if str(data.get("to") or "").isdigit() else None
        if not to or to.pk == me.pk:
            raise InvalidInput("找不到要傳送的裝置")
        if not to.online:
            raise InvalidInput(f"「{to.name}」目前不在線上，請先在那台裝置打開 Ukiyo")
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
