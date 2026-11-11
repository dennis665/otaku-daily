from django.conf import settings
from django.db import models

# 可以由使用者自己關閉的分頁（音樂是首頁，固定顯示）
HIDEABLE_TABS = ("video", "events", "plan", "drama", "gacha")


class UserPrefs(models.Model):
    """個人設定：目前只有「隱藏哪些分頁」"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="prefs")
    hidden_tabs = models.JSONField("隱藏的分頁", default=list, blank=True)

    def __str__(self):
        return f"{self.user} 的設定"

    @classmethod
    def hidden_for(cls, user):
        p = cls.objects.filter(user=user).first()
        return [t for t in (p.hidden_tabs if p else []) if t in HIDEABLE_TABS]


class Playlist(models.Model):
    """個人歌單：songs 存歌曲編號（影音儲存庫的檔名，不含副檔名），依加入順序"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="playlists")
    name = models.CharField("名稱", max_length=40)
    songs = models.JSONField("歌曲", default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at", "id"]

    def __str__(self):
        return self.name
