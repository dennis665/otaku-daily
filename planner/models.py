"""
行程小幫手：從 csi_server 的 LINE 版移植過來，改用 Ukiyo 自己的帳號與群組。

- 個人行程：group 為空，只有建立者看得到（以及按過「我有興趣」的人）
- 群組行程：群組成員都看得到；用邀請連結加入群組（取代原本的 LINE 群組）
- 時間可以先不定（date_time 為空），之後再「決定時間」定案
- 權限：建立者或群組成員可以編輯、刪除、定案（修正舊版任何人都能刪的問題）
"""
import secrets

from django.conf import settings
from django.db import models
from django.db.models import Q


def new_token():
    return secrets.token_urlsafe(9)


class Group(models.Model):
    name = models.CharField("群組名稱", max_length=40)
    invite_code = models.CharField("邀請碼", max_length=20, unique=True, default=new_token)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="+")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "群組"

    def __str__(self):
        return self.name


class GroupMember(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="members")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="plan_groups")
    is_owner = models.BooleanField("建立者", default=False)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "群組成員"
        constraints = [models.UniqueConstraint(fields=["group", "user"], name="unique_group_member")]


class GroupInvitation(models.Model):
    """邀請已註冊的會員加入群組；對方按「加入」才會成為成員"""
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="invitations")
    invitee = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="group_invitations")
    inviter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="+")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "群組邀請"
        constraints = [models.UniqueConstraint(fields=["group", "invitee"], name="unique_group_invitation")]


class Itinerary(models.Model):
    class Type(models.TextChoices):
        ANIME = "ANIME", "🎪 動漫活動"
        EAT = "EAT", "🍜 吃飯"
        EXHIBIT = "EXHIBIT", "🖼️ 展覽"
        MOVIE = "MOVIE", "🎬 電影"
        SPORT = "SPORT", "🏃 運動"
        TRAVEL = "TRAVEL", "🚗 出遊"
        OTHER = "OTHER", "📌 其他"

    # 提前提醒的選項（分鐘）：推播功能完成後才會實際發送
    NOTIFY_CHOICES = [
        (0, "準時"), (10, "10 分鐘前"), (30, "30 分鐘前"), (60, "1 小時前"), (120, "2 小時前"),
        (180, "3 小時前"), (360, "6 小時前"), (720, "12 小時前"), (1440, "1 天前"), (2880, "2 天前"),
        (4320, "3 天前"), (10080, "1 週前"),
    ]

    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="itineraries")
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True, related_name="itineraries")
    title = models.CharField("標題", max_length=100)
    activity_type = models.CharField("類型", max_length=10, choices=Type.choices, default=Type.OTHER)
    date_time = models.DateTimeField("時間", null=True, blank=True)   # 空白 = 時間未定
    location = models.CharField("地點", max_length=200, blank=True)
    notes = models.TextField("備註", blank=True)
    links = models.JSONField("相關連結", default=list, blank=True)    # [{"title": "...", "url": "..."}]
    notify_minutes_before = models.PositiveIntegerField("提前提醒（分鐘）", default=1440)
    is_notified = models.BooleanField("已提醒", default=False)
    share_token = models.CharField("分享碼", max_length=20, unique=True, default=new_token)
    interested = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="interested_itineraries")
    hidden_by = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="hidden_itineraries")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "行程"
        ordering = ["date_time", "-created_at"]

    def __str__(self):
        return self.title

    @classmethod
    def visible_to(cls, user):
        """看得到的行程：自己建立的、所屬群組的、按過「我有興趣」的"""
        return cls.objects.filter(
            Q(creator=user) | Q(group__members__user=user) | Q(interested=user)
        ).distinct()

    def can_manage(self, user):
        """可以編輯、刪除、定案：建立者，或群組行程的群組成員"""
        if self.creator_id == user.id:
            return True
        return bool(self.group_id) and self.group.members.filter(user=user).exists()
