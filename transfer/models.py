"""檔案互傳：伺服器只負責「牽線」（記錄裝置在線狀態、交換 WebRTC 連線資訊），
檔案內容由兩台裝置點對點直接傳送，不經過伺服器、也不存在伺服器上。"""
import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone

MB = 1024 * 1024
MAX_FILES = 10                 # 一次最多幾個檔案
MAX_TOTAL = 500 * MB           # 一次最多總共多大
MAX_FILE_IOS = 200 * MB        # 收檔端是 iPhone／iPad：單檔上限（Safari 收檔時整個檔案放在記憶體）
ONLINE_SECONDS = 30            # 多久內有回報算在線
WAIT_SECONDS = 120             # 對方多久沒按接收就算逾時
KEEP_HOURS = 24                # 傳送紀錄（只有檔名與大小）保留多久
DEVICE_KEEP_DAYS = 60          # 多久沒出現的裝置自動移除


class Device(models.Model):
    """使用者的一台裝置（瀏覽器）；device_id 由瀏覽器產生、存在 localStorage"""
    PLATFORMS = [("ios", "iPhone／iPad"), ("android", "Android"), ("desktop", "電腦")]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="transfer_devices")
    device_id = models.CharField(max_length=40)
    name = models.CharField("裝置名稱", max_length=30)
    platform = models.CharField(max_length=10, choices=PLATFORMS, default="desktop")
    last_seen = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = verbose_name_plural = "互傳裝置"
        constraints = [models.UniqueConstraint(fields=["user", "device_id"], name="unique_transfer_device")]

    def __str__(self):
        return f"{self.user} - {self.name}"

    @property
    def online(self):
        return timezone.now() - self.last_seen < timedelta(seconds=ONLINE_SECONDS)


class Transfer(models.Model):
    """一次傳送：傳送端建立時附上 offer，收檔端按接收後回 answer，之後由兩台裝置直接連線"""
    WAITING, ACCEPTED, DECLINED, CANCELLED, DONE, FAILED = "waiting", "accepted", "declined", "cancelled", "done", "failed"
    STATUSES = [(WAITING, "等待接收"), (ACCEPTED, "傳送中"), (DECLINED, "對方拒絕"),
                (CANCELLED, "已取消"), (DONE, "完成"), (FAILED, "失敗")]
    FINISHED = {DECLINED, CANCELLED, DONE, FAILED}

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_transfers")
    from_device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="outgoing")
    to_device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name="incoming")
    files = models.JSONField(default=list)   # [{name, size, type}]
    total_size = models.BigIntegerField(default=0)
    offer = models.TextField(blank=True)
    answer = models.TextField(blank=True)
    status = models.CharField(max_length=10, choices=STATUSES, default=WAITING)
    note = models.CharField(max_length=100, blank=True)   # 失敗原因
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "互傳紀錄"
        ordering = ["-created_at"]

    @property
    def expired(self):
        return self.status == self.WAITING and timezone.now() - self.created_at > timedelta(seconds=WAIT_SECONDS)
