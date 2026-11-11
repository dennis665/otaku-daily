"""抽卡邏輯：機率、保底、每日次數（台灣時間 00:00 重置）"""
import random
from datetime import datetime, timedelta, timezone

from django.conf import settings
from django.db import IntegrityError, transaction

from dramas.models import Follow, Work

from .models import FREE_DAILY, PITY_AT, RARITIES, RARITY_WEIGHT, GachaState, OwnedCard, Pull

TW = timezone(timedelta(hours=8))
HIGH = {"SSR", "UR", "LR"}


class PullError(Exception):
    pass


def today():
    return datetime.now(TW).date()


def roll_rarity(rng=random, pity=False):
    """依機率抽稀有度；保底時只在 SSR 以上依原比例抽"""
    pool = [r for r in RARITIES if not pity or r in HIGH]
    return rng.choices(pool, weights=[RARITY_WEIGHT[r] for r in pool])[0]


def unlimited(user):
    """測試站的特別帳號：不限抽卡次數（設定見 settings.GACHA_UNLIMITED_USERS）"""
    return user.username in getattr(settings, "GACHA_UNLIMITED_USERS", set())


def status(user):
    """今天還能抽哪些：追的作品（尚未抽過的）與全作品隨機剩餘次數"""
    day = today()
    if unlimited(user):
        state = GachaState.objects.filter(user=user).first()
        return {"day": day.isoformat(), "follow_left": list(Follow.objects.filter(user=user).values_list("work_id", flat=True)),
                "free_left": 999, "pity_left": PITY_AT - (state.since_ssr if state else 0), "unlimited": True}
    done = set(Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FOLLOW).values_list("work_id", flat=True))
    followed = list(Follow.objects.filter(user=user).values_list("work_id", flat=True))
    free_used = Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FREE).count()
    state = GachaState.objects.filter(user=user).first()
    return {
        "day": day.isoformat(),
        "follow_left": [w for w in followed if w not in done],
        "free_left": max(0, FREE_DAILY - free_used),
        "pity_left": PITY_AT - (state.since_ssr if state else 0),
    }


def pull_all(user, rng=random):
    """追的作品今天還沒抽的全部抽一次；回傳 [(Pull, 是否新卡)]"""
    out = []
    for wid in status(user)["follow_left"]:
        try:
            out.append(pull(user, wid, rng))
        except PullError:
            pass   # 同時在別的裝置抽過了
    return out


def pull(user, work_id=None, rng=random):
    """抽一張：有 work_id＝追的作品那部；沒有＝全作品隨機池。回傳 (Pull, 是否新卡)"""
    day = today()
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        if work_id:
            if not Follow.objects.filter(user=user, work_id=work_id).exists():
                raise PullError("只能抽你追的作品")
            work = Work.objects.get(pk=work_id)
            # 不限次數的帳號記成隨機池，才不會被「同一部一天一次」擋下
            pool = Pull.Pool.FREE if unlimited(user) else Pull.Pool.FOLLOW
        else:
            if not unlimited(user) and Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FREE).count() >= FREE_DAILY:
                raise PullError("今天的隨機抽已經用完了，明天再來！")
            qs = Work.objects.exclude(images=[])
            n = qs.count()
            if not n:
                raise PullError("目前沒有可以抽的作品")
            work = qs[rng.randrange(n)]
            pool = Pull.Pool.FREE
        pity = state.since_ssr + 1 >= PITY_AT
        rarity = roll_rarity(rng, pity=pity)
        try:
            with transaction.atomic():
                p = Pull.objects.create(user=user, work=work, rarity=rarity, pool=pool, day=day, pity=pity)
        except IntegrityError:
            raise PullError("這部作品今天已經抽過了，明天再來！")
        state.total += 1
        state.since_ssr = 0 if rarity in HIGH else state.since_ssr + 1
        state.save()
        card, created = OwnedCard.objects.get_or_create(user=user, work=work, rarity=rarity)
        if not created:
            card.count += 1
            card.save(update_fields=["count", "last_at"])
    return p, created
