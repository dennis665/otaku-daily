"""
網頁推播（Web Push）：iPhone 要 iOS 16.4 以上且「加入主畫面」後才能收到；Android Chrome 都可以。

- VAPID 金鑰第一次使用時自動產生並存在資料庫（也可以用環境變數 VAPID_PUBLIC_KEY / VAPID_PRIVATE_PEM 指定）
- 送給某個使用者 = 送到他所有已訂閱的裝置；推播服務回 404/410 代表訂閱已失效，直接刪除
"""
import base64
import json
import logging
import os

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec
from django.db import transaction
from django.templatetags.static import static
from django.utils import timezone
from py_vapid import Vapid02
from pywebpush import WebPushException, webpush

from .models import PushSubscription, VapidKey

logger = logging.getLogger(__name__)

# 推播服務要求的聯絡資訊；用網站網址即可，不需要 email
VAPID_SUBJECT = os.environ.get("VAPID_SUBJECT", "https://otaku-daily.onrender.com")
TTL_SECONDS = 6 * 60 * 60   # 裝置離線時，推播服務最多保留 6 小時


def _b64url(raw):
    return base64.urlsafe_b64encode(raw).rstrip(b"=").decode()


def _generate():
    key = ec.generate_private_key(ec.SECP256R1())
    pem = key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()).decode()
    public = key.public_key().public_bytes(serialization.Encoding.X962, serialization.PublicFormat.UncompressedPoint)
    return _b64url(public), pem


def get_keys():
    """回傳 (public_key, private_pem)"""
    env_pub, env_pem = os.environ.get("VAPID_PUBLIC_KEY"), os.environ.get("VAPID_PRIVATE_PEM")
    if env_pub and env_pem:
        return env_pub, env_pem
    with transaction.atomic():
        row = VapidKey.objects.select_for_update().order_by("id").first()
        if row is None:
            public, pem = _generate()
            row = VapidKey.objects.create(public_key=public, private_pem=pem)
    return row.public_key, row.private_pem


def send_to_subscription(sub, payload, vapid):
    """送出一則推播；回傳 True 成功 / False 失敗（失效的訂閱會被刪除）"""
    try:
        webpush(
            subscription_info={"endpoint": sub.endpoint, "keys": {"p256dh": sub.p256dh, "auth": sub.auth}},
            data=json.dumps(payload, ensure_ascii=False),
            vapid_private_key=vapid,
            vapid_claims={"sub": VAPID_SUBJECT},   # 每次都給新的 dict（函式會修改它）
            ttl=TTL_SECONDS,
            timeout=10,
        )
    except WebPushException as exc:
        status = getattr(exc.response, "status_code", None)
        # 404/410：訂閱已失效；400/403：通常是金鑰不符（例如網站換了金鑰），這個訂閱再也送不到
        if status in (400, 403, 404, 410):
            logger.info("推播訂閱已失效，刪除：user=%s", sub.user_id)
            sub.delete()
        else:
            logger.warning("推播失敗 user=%s status=%s：%s", sub.user_id, status, exc)
        return False
    except Exception:
        logger.exception("推播發生錯誤 user=%s", sub.user_id)
        return False
    sub.last_success_at = timezone.now()
    sub.save(update_fields=["last_success_at"])
    return True


def send_to_users(users, title, body, url="/", tag=None):
    """送推播給多位使用者的所有裝置；回傳 (成功數, 失敗數)"""
    subs = list(PushSubscription.objects.filter(user__in=users))
    if not subs:
        return 0, 0
    _, pem = get_keys()
    vapid = Vapid02.from_pem(pem.encode())
    payload = {"title": title, "body": body, "url": url, "tag": tag or "", "icon": static("icons/icon-192.png")}
    ok = sum(send_to_subscription(s, payload, vapid) for s in subs)
    return ok, len(subs) - ok
