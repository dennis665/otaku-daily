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
    """個人歌單：songs 存歌曲編號（影音儲存庫的檔名，不含副檔名），依加入順序；kind＝音樂歌單或影片歌單（各自獨立）"""
    KINDS = ("audio", "video")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="playlists")
    kind = models.CharField("類型", max_length=5, default="audio", choices=[("audio", "音樂"), ("video", "影片")])
    name = models.CharField("名稱", max_length=40)
    songs = models.JSONField("歌曲", default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at", "id"]

    def __str__(self):
        return self.name


# 🙋 歌曲投稿：大家可以投稿想加進音樂清單的歌（作品＋類型＋YouTube 連結），管理者有空時批次下載匯入
SONG_KINDS = ("TV片頭曲", "完整片頭曲", "TV片尾曲", "完整ED", "劇中歌", "完整劇中歌", "其他")


class SongRequest(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="song_requests")
    work = models.ForeignKey("dramas.Work", null=True, blank=True, on_delete=models.SET_NULL, related_name="song_requests")
    title = models.CharField("作品名稱（不在追劇清單時自己輸入）", max_length=150, blank=True)
    kind = models.CharField("類型", max_length=20)
    tags = models.CharField("自訂標籤", max_length=100, blank=True)
    url = models.URLField("YouTube 連結", max_length=300)
    audio = models.BooleanField("下載音樂", default=True)
    video = models.BooleanField("下載影片", default=True)
    note = models.CharField("備註", max_length=200, blank=True)
    sec = models.PositiveIntegerField("影片長度（秒，0＝不明）", default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at", "-id"]

    def __str__(self):
        return f"{self.work.title if self.work else self.title} {self.kind}"


class SongMissSkip(models.Model):
    """「我的追劇缺歌」按了「已看過不處理」的作品（之後不再列出，可恢復）"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="song_miss_skips")
    work = models.ForeignKey("dramas.Work", on_delete=models.CASCADE, related_name="+")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "work"], name="uniq_song_miss_skip")]
