"""
動畫小卡抽卡
- 卡片（Card）＝一張卡面圖片：屬於某部作品、有一個稀有度；同一部作品同一稀有度可以有很多張
- 卡面圖片放在 GitHub（dennis665/fenglan-media-assets 的 cards/，索引 cards/index.json），伺服器定期讀索引同步成 Card
- 只有「有卡片」的作品才抽得到；抽卡先抽稀有度，再從該作品這個稀有度的卡裡隨機一張
- 每天（台灣時間 00:00 重置）：追的作品每部 1 抽，另外送 FREE_DAILY 次全作品隨機抽
- 抽卡結果由伺服器決定並留下紀錄（Pull），重新整理也洗不掉
"""
from django.conf import settings
from django.db import models

from dramas.models import Work

RARITIES = ["N", "R", "SR", "SSR", "UR", "LR"]
RARITY_LABEL = {"N": "N", "R": "R", "SR": "SR", "SSR": "SSR", "UR": "UR", "LR": "秘・LR"}
# 機率（萬分比，合計 10000）
RARITY_WEIGHT = {"N": 5500, "R": 2700, "SR": 1200, "SSR": 500, "UR": 90, "LR": 10}
PITY_AT = 50          # 連續 50 抽沒有 SSR 以上，下一抽必定 SSR 以上
FREE_DAILY = 3        # 每天全作品隨機池的次數


class Card(models.Model):
    """一張卡：作品 × 稀有度 × 卡面圖片（file 是 cards/ 底下的路徑；空白＝早期沒有圖的舊卡，不會再被抽到）"""
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="gacha_cards")
    rarity = models.CharField(max_length=3, choices=[(r, RARITY_LABEL[r]) for r in RARITIES])
    file = models.CharField("卡面檔案", max_length=200, blank=True, db_index=True)
    name = models.CharField("卡片名稱", max_length=100, blank=True)
    active = models.BooleanField("可以抽到", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "卡片"
        ordering = ["work_id", "rarity", "id"]

    def __str__(self):
        return f"{self.work} {self.rarity} {self.name or self.file}"


class Pull(models.Model):
    class Pool(models.TextChoices):
        FOLLOW = "follow", "追的作品"
        FREE = "free", "全作品隨機"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_pulls")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="+")
    rarity = models.CharField(max_length=3, choices=[(r, RARITY_LABEL[r]) for r in RARITIES])
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, related_name="+")
    pool = models.CharField(max_length=10, choices=Pool.choices)
    day = models.DateField("台灣日期", db_index=True)
    pity = models.BooleanField("保底出貨", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "抽卡紀錄"
        ordering = ["-created_at"]
        constraints = [
            # 追的作品：同一天同一部只能抽一次
            models.UniqueConstraint(fields=["user", "work", "day"], condition=models.Q(pool="follow"), name="gacha_one_follow_pull_per_day"),
        ]


class OwnedCard(models.Model):
    """集卡冊：同一張卡抽到幾次（work、rarity 跟著卡片存一份，方便查詢）"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_owned")
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, related_name="+")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="+")
    rarity = models.CharField(max_length=3)
    count = models.PositiveIntegerField(default=1)
    first_at = models.DateTimeField(auto_now_add=True)
    last_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "持有卡片"
        constraints = [models.UniqueConstraint(fields=["user", "card"], name="gacha_owned_card_unique")]


class GachaState(models.Model):
    """每個帳號的保底計數"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_state")
    since_ssr = models.PositiveIntegerField("距離上次 SSR 以上的抽數", default=0)
    total = models.PositiveIntegerField("總抽數", default=0)

    class Meta:
        verbose_name = verbose_name_plural = "抽卡狀態"
