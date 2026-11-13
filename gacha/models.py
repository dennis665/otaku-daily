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
PITY_AT = 50          # 每 50 抽必定 SSR 以上（中途抽到不提前歸零）
PITY_SR_AT = 10       # 每 10 抽必定 SR 以上（中途抽到不提前歸零）
PITY_NEW_AT = 100     # 每 100 抽必中沒拿過的新卡（中途抽到不提前歸零）；抽的作品已經全部收集時不觸發，次數保留到下次
FREE_DAILY = 5        # 每天「隨機抽卡券」（全作品大混池）張數，當天有效
PICK_DAILY = 10       # 每天「自選抽卡券」（自己選作品抽）張數，當天有效
TASK_SECONDS = 300    # 每日任務：當天 App 累積在線 5 分鐘
TASK_REWARD = 5       # 任務獎勵：自選抽卡券 5 張（保留券，不會過期，可累積）

# ✨ 星塵：重複的卡分解（至少保留 1 張）可以拿到星塵；🛒 星塵可以兌換自選抽卡券或還沒收集到的指定卡
DUST_VALUE = {"N": 1, "R": 3, "SR": 10, "SSR": 30, "UR": 80, "LR": 200}       # 分解 1 張得到的星塵
CARD_PRICE = {"N": 15, "R": 40, "SR": 120, "SSR": 350, "UR": 900, "LR": 2500}  # 兌換 1 張指定卡要的星塵
TICKET_PRICE = 30     # 兌換 1 張自選抽卡券（保留券）要的星塵
NEW_WORK_GIFT = 10    # 新作品上架：每部送所有帳號自選抽卡券 10 張（保留券）
COMBO_DUST_PER_MEMBER = 20   # 🏆 組合羈絆：集齊一組（每位角色至少 1 張卡）送 成員數 × 20 星塵（每組只送一次）
SHOWCASE_MAX = 3             # ⭐ 展示櫃最多放 3 張
QUIZ_DAILY = 3               # 問答（🎵 聽歌猜作品、💬 名言猜猜看）：每種每天 3 題
QUIZ_REWARD = 10             # 答對 1 題送 10 星塵
# 🏅 收集稱號：全部作品合計收集到幾種卡
KIND_TITLES = [(10, "收藏新手"), (50, "資深收藏家"), (150, "傳說收藏家")]


class Card(models.Model):
    """一張卡：作品 × 稀有度 × 卡面圖片（file 是 cards/ 底下的路徑；空白＝早期沒有圖的舊卡，不會再被抽到）"""
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="gacha_cards")
    rarity = models.CharField(max_length=3, choices=[(r, RARITY_LABEL[r]) for r in RARITIES])
    file = models.CharField("卡面檔案", max_length=200, blank=True, db_index=True)
    name = models.CharField("卡片名稱", max_length=100, blank=True)
    no = models.PositiveIntegerField("卡號（同作品內編號）", default=0)
    active = models.BooleanField("可以抽到", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "卡片"
        ordering = ["work_id", "no", "id"]

    def __str__(self):
        return f"{self.work} {self.rarity} {self.name or self.file}"


class Pull(models.Model):
    class Pool(models.TextChoices):
        FOLLOW = "follow", "追的作品（舊制）"
        FREE = "free", "全作品隨機"
        PICK = "pick", "自選作品"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_pulls")
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="+")
    rarity = models.CharField(max_length=3, choices=[(r, RARITY_LABEL[r]) for r in RARITIES])
    card = models.ForeignKey(Card, on_delete=models.CASCADE, null=True, related_name="+")
    pool = models.CharField(max_length=10, choices=Pool.choices)
    ticket = models.CharField("使用的券", max_length=10, blank=True)   # daily＝當天的自選券、bonus＝任務送的保留券
    day = models.DateField("台灣日期", db_index=True)
    pity = models.BooleanField("保底出貨", default=False)
    pity_kind = models.CharField("保底種類", max_length=5, blank=True)   # sr＝10 抽 SR、ssr＝50 抽 SSR、new＝100 抽新卡
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
    since_sr = models.PositiveIntegerField("距離上次 SR 以上的抽數", default=0)
    since_new = models.PositiveIntegerField("距離上次抽到新卡的抽數", default=0)
    total = models.PositiveIntegerField("總抽數", default=0)
    bonus_tickets = models.PositiveIntegerField("保留的自選抽卡券", default=0)   # 任務獎勵，不會過期
    stardust = models.PositiveIntegerField("星塵", default=0)
    notice = models.CharField("要告訴使用者的訊息（顯示一次）", max_length=200, blank=True)   # 例：卡片下架退還星塵
    titles = models.JSONField("已解鎖的稱號", default=list, blank=True)         # 解鎖後永久保留
    title = models.CharField("顯示中的稱號", max_length=60, blank=True)
    showcase = models.JSONField("展示櫃（卡片 id，最多 3 張）", default=list, blank=True)

    class Meta:
        verbose_name = verbose_name_plural = "抽卡狀態"


class GachaDay(models.Model):
    """每個帳號每天的在線時間與任務領取狀態"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_days")
    day = models.DateField("台灣日期")
    online_seconds = models.PositiveIntegerField("在線秒數", default=0)
    last_beat = models.DateTimeField("上次在線回報", null=True, blank=True)
    task_claimed = models.BooleanField("在線任務已領取", default=False)

    class Meta:
        verbose_name = verbose_name_plural = "每日在線與任務"
        constraints = [models.UniqueConstraint(fields=["user", "day"], name="gacha_day_unique")]


class GiftedWork(models.Model):
    """已經發過「新作品上架」禮物的作品（以系列為單位，同一部只送一次）"""
    key = models.CharField("作品代號", max_length=40, unique=True)   # f<系列 id> 或 w<作品 id>
    at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "新作品上架禮物"


class ComboReward(models.Model):
    """已經領過獎勵的組合羈絆（每個帳號每組只送一次）"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_combos")
    key = models.CharField("組合代號", max_length=120)   # <作品編號>:<組合名稱>
    at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "組合羈絆獎勵"
        constraints = [models.UniqueConstraint(fields=["user", "key"], name="gacha_combo_unique")]


class QuizQuestion(models.Model):
    """問答：🎵 聽歌猜作品（song）、💬 名言猜猜看（quote）；每題由伺服器出題並記錄答案（每種每天 QUIZ_DAILY 題）"""
    KINDS = ("song", "quote")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="gacha_quiz")
    day = models.DateField("台灣日期")
    kind = models.CharField("題型", max_length=10, default="song")
    song_url = models.URLField("歌曲網址", max_length=500, blank=True)
    prompt = models.CharField("題目文字（名言）", max_length=300, blank=True)
    answer = models.CharField("正確作品", max_length=255)
    options = models.JSONField("選項", default=list)
    picked = models.CharField("回答", max_length=255, blank=True)
    correct = models.BooleanField(null=True)
    at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = verbose_name_plural = "聽歌猜作品"
        ordering = ["id"]

