"""
追劇小幫手：從 csi_server LINE 版移植，簡化成「我在追哪些作品」（不記集數、不做追蹤通知）。

- 作品以來源網站 youranimes 的作品編號（source_id）當身分證：同一部作品不論名稱怎麼變、
  出現在幾個分類（日版／台版上映、動畫化決定、跨季播出）都只有一筆，舊名稱存在 alt_titles
- 播出／上映紀錄（Airing）掛在作品底下，一部作品可以有多筆
- 好友 = 有共同群組的人（沿用行程小幫手的群組）
"""
import re

from django.conf import settings
from django.db import models


class Franchise(models.Model):
    """作品系列（同一個 IP 的 TV、劇場版、OVA…）"""
    name = models.CharField("系列名稱", max_length=150, unique=True)

    class Meta:
        verbose_name = verbose_name_plural = "作品系列"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Work(models.Model):
    class Media(models.TextChoices):
        TV = "TV", "TV"
        MOVIE = "MOVIE", "劇場版"
        OVA = "OVA", "OVA／特別篇"
        RECAP = "RECAP", "總集篇"

    source_id = models.PositiveIntegerField("youranimes 作品編號", unique=True, null=True, blank=True)
    title = models.CharField("名稱", max_length=255)
    alt_titles = models.JSONField("其他名稱", default=list, blank=True)
    search_text = models.TextField("搜尋用文字", blank=True, editable=False)
    media_type = models.CharField("類型", max_length=10, choices=Media.choices, default=Media.TV)
    franchise = models.ForeignKey(Franchise, on_delete=models.SET_NULL, null=True, blank=True, related_name="works")
    images = models.JSONField("封面圖", default=list, blank=True)
    mp3_links = models.JSONField("主題曲 MP3", default=list, blank=True)
    mp4_links = models.JSONField("影片 MP4", default=list, blank=True)
    sort_key = models.CharField("排序用（最新播出）", max_length=8, blank=True, db_index=True)   # 例如 202607；動畫化決定為 999999
    first_seen = models.DateField("每日抓取首次發現", null=True, blank=True)   # 搬家的舊資料為空；14 天內顯示 NEW
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "作品"
        ordering = ["-sort_key", "title"]

    def __str__(self):
        return self.title

    @property
    def info_url(self):
        return f"https://youranimes.tw/animes/{self.source_id}" if self.source_id else ""

    def refresh_search(self):
        self.search_text = normalize(" ".join([self.title, *self.alt_titles, self.franchise.name if self.franchise else ""]))


class Airing(models.Model):
    """播出／上映紀錄：TV 季度、日版上映、台版上映、動畫化決定、電影製作決定"""
    class Kind(models.TextChoices):
        SEASON = "SEASON", "新番"
        JP_MOVIE = "JP_MOVIE", "日版上映"
        TW_MOVIE = "TW_MOVIE", "台版上映"
        ANNOUNCED = "ANNOUNCED", "動畫化決定"
        MOVIE_ANNOUNCED = "MOVIE_ANNOUNCED", "電影製作決定"

    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="airings")
    kind = models.CharField(max_length=20, choices=Kind.choices)
    label = models.CharField("顯示名稱", max_length=50)   # 例如「2026年7月新番」「2026年台版動畫電影」
    year = models.PositiveSmallIntegerField(null=True, blank=True)
    month = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        verbose_name = verbose_name_plural = "播出紀錄"
        constraints = [models.UniqueConstraint(fields=["work", "label"], name="unique_work_airing")]
        indexes = [models.Index(fields=["year", "month"])]

    @property
    def sort_key(self):
        if self.kind in (self.Kind.ANNOUNCED, self.Kind.MOVIE_ANNOUNCED) or not self.year:
            return "999999"
        return f"{self.year:04d}{(self.month or 0):02d}"


class Follow(models.Model):
    """我的追劇：只記錄「有在追」"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="drama_follows")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="follows")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "我的追劇"
        constraints = [models.UniqueConstraint(fields=["user", "work"], name="unique_follow")]


class Recommendation(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "待回覆"
        ACCEPTED = "accepted", "已接受"
        REJECTED = "rejected", "已拒絕"

    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="drama_recs_sent")
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="drama_recs_received")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="recommendations")
    note = models.CharField("推薦語", max_length=200, blank=True)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "追劇推薦"
        constraints = [models.UniqueConstraint(fields=["from_user", "to_user", "work"], name="unique_recommendation")]


# ---------- 名稱處理（搬家、每日抓取、搜尋共用） ----------
_PUNCT = re.compile(r"[\s\-_:：!！?？・·.,，、~～()（）\[\]【】「」『』〈〉《》\"'’/／]+")


def normalize(text):
    import unicodedata
    return _PUNCT.sub("", unicodedata.normalize("NFKC", text or "").lower())


def looks_chinese(title):
    """名稱以中文為主（有漢字、沒有日文假名）→ 優先當作顯示名稱"""
    return bool(re.search(r"[一-鿿]", title)) and not re.search(r"[぀-ヿ]", title)


def media_from_title(title, default="TV"):
    if "總集篇" in title:
        return Work.Media.RECAP
    if re.search(r"OVA|OAD|特別篇", title, re.I):
        return Work.Media.OVA
    return default


def parse_label(label):
    """分類名稱 → (kind, year, month)"""
    if label == "動畫化決定":
        return Airing.Kind.ANNOUNCED, None, None
    if "製作決定" in label:
        return Airing.Kind.MOVIE_ANNOUNCED, None, None
    m = re.match(r"(\d{4})年(\d{1,2})月新番", label)
    if m:
        return Airing.Kind.SEASON, int(m.group(1)), int(m.group(2))
    m = re.match(r"(\d{4})年(日|台)版動畫電影", label)
    if m:
        return (Airing.Kind.JP_MOVIE if m.group(2) == "日" else Airing.Kind.TW_MOVIE), int(m.group(1)), None
    return Airing.Kind.ANNOUNCED, None, None
