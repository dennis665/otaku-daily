"""
動畫小卡抽卡（第一階段）
- 卡片 = 作品 × 稀有度（N～LR 共 6 張），集卡冊每部作品顯示 6 格收集進度
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


class Pull(models.Model):
    class Pool(models.TextChoices):
        FOLLOW = "follow", "追的作品"
        FREE = "free", "全作品隨機"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_pulls")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="+")
    rarity = models.CharField(max_length=3, choices=[(r, RARITY_LABEL[r]) for r in RARITIES])
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
    """集卡冊：同一張卡（作品 × 稀有度）抽到幾次"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_cards")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="+")
    rarity = models.CharField(max_length=3)
    count = models.PositiveIntegerField(default=1)
    first_at = models.DateTimeField(auto_now_add=True)
    last_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = verbose_name_plural = "持有卡片"
        constraints = [models.UniqueConstraint(fields=["user", "work", "rarity"], name="gacha_owned_unique")]


class GachaState(models.Model):
    """每個帳號的保底計數"""
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_state")
    since_ssr = models.PositiveIntegerField("距離上次 SSR 以上的抽數", default=0)
    total = models.PositiveIntegerField("總抽數", default=0)

    class Meta:
        verbose_name = verbose_name_plural = "抽卡狀態"
