import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from .models import PushSubscription
from .push import get_keys, send_to_users
from .reminders import send_due_reminders


def _body(request):
    try:
        return json.loads(request.body or "{}")
    except ValueError:
        return {}


@login_required
@require_GET
@never_cache
def status(request):
    """推播公開金鑰與我已訂閱的裝置"""
    public, _ = get_keys()
    subs = request.user.push_subscriptions.order_by("-created_at")
    return JsonResponse({
        "public_key": public,
        "devices": [{"endpoint": s.endpoint, "label": s.device_label(), "created": s.created_at.strftime("%Y-%m-%d")} for s in subs],
    })


@login_required
@require_POST
def subscribe(request):
    data = _body(request)
    endpoint = data.get("endpoint") or ""
    keys = data.get("keys") or {}
    if not endpoint.startswith("https://") or not keys.get("p256dh") or not keys.get("auth"):
        return JsonResponse({"ok": False, "error": "訂閱資料不完整"}, status=400)
    PushSubscription.objects.update_or_create(endpoint=endpoint, defaults={
        "user": request.user, "p256dh": keys["p256dh"], "auth": keys["auth"],
        "user_agent": request.headers.get("User-Agent", "")[:300],
    })
    return JsonResponse({"ok": True})


@login_required
@require_POST
def unsubscribe(request):
    endpoint = _body(request).get("endpoint") or ""
    request.user.push_subscriptions.filter(endpoint=endpoint).delete()
    return JsonResponse({"ok": True})


@login_required
@require_POST
def test(request):
    """送一則測試通知到自己所有的裝置"""
    ok, failed = send_to_users([request.user], "🔔 Ukiyo 測試通知", "推播通知設定成功！之後行程提醒會這樣通知你。", url="/?tab=plan", tag="test")
    if not ok and not failed:
        return JsonResponse({"ok": False, "error": "這個帳號還沒有開啟通知的裝置"}, status=400)
    return JsonResponse({"ok": ok > 0, "sent": ok, "failed": failed})


@csrf_exempt
@require_http_methods(["GET", "POST"])
@never_cache
def tick(request):
    """外部排程定時呼叫：發送到期的提醒。只會發「已經到期、還沒發過」的提醒，重複呼叫不會重複發送，所以不需要密碼。"""
    return JsonResponse({"ok": True, "reminders": send_due_reminders()})
