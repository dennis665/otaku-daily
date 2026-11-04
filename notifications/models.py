from django.conf import settings
from django.db import models


class VapidKey(models.Model):
    """推播用的 VAPID 金鑰（整站一組）。第一次使用時自動產生，不用到主機後台手動設定。"""
    public_key = models.CharField(max_length=200)     # base64url，給瀏覽器訂閱用
    private_pem = models.TextField()                  # 私鑰，只在伺服器上用來簽章
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "推播金鑰"


class PushSubscription(models.Model):
    """一個使用者的一台裝置（瀏覽器 / 主畫面 App）的推播訂閱"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="push_subscriptions")
    endpoint = models.URLField(max_length=1000, unique=True)
    p256dh = models.CharField(max_length=200)
    auth = models.CharField(max_length=100)
    user_agent = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_success_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = verbose_name_plural = "推播訂閱"

    def device_label(self):
        ua = self.user_agent
        for key, label in (("iPhone", "iPhone"), ("iPad", "iPad"), ("Android", "Android"), ("Windows", "Windows"), ("Mac", "Mac")):
            if key in ua:
                return label
        return "裝置"
