"""抽卡邏輯：機率、保底、每日次數（台灣時間 00:00 重置）。只有「有卡片」的作品抽得到"""
import random
from datetime import datetime, timedelta, timezone

from django.conf import settings
from django.db import IntegrityError, transaction

from dramas.models import Follow, Work

from . import cards
from .models import FREE_DAILY, PITY_AT, RARITIES, RARITY_WEIGHT, Card, GachaState, OwnedCard, Pull

TW = timezone(timedelta(hours=8))
HIGH = {"SSR", "UR", "LR"}


class PullError(Exception):
    pass


def today():
    return datetime.now(TW).date()


def unlimited(user):
    """測試站的特別帳號：不限抽卡次數（設定見 settings.GACHA_UNLIMITED_USERS）"""
    return user.username in getattr(settings, "GACHA_UNLIMITED_USERS", set())


def roll_rarity(rng=random, pity=False, allowed=None):
    """依機率抽稀有度；保底時只在 SSR 以上依原比例抽；allowed＝這部作品有的稀有度"""
    pool = [r for r in RARITIES if (not pity or r in HIGH) and (allowed is None or r in allowed)]
    if not pool:
        return None
    return rng.choices(pool, weights=[RARITY_WEIGHT[r] for r in pool])[0]


def drawable_work_ids():
    """有可抽卡片的作品"""
    return set(Card.objects.filter(active=True).values_list("work_id", flat=True))


def status(user):
    """今天還能抽哪些：追的作品（有卡片、今天還沒抽的）與全作品隨機剩餘次數"""
    cards.sync()
    day = today()
    drawable = drawable_work_ids()
    followed = [w for w in Follow.objects.filter(user=user).values_list("work_id", flat=True) if w in drawable]
    state = GachaState.objects.filter(user=user).first()
    base = {"day": day.isoformat(), "pity_left": PITY_AT - (state.since_ssr if state else 0), "pool_works": len(drawable)}
    if unlimited(user):
        return {**base, "follow_left": followed, "free_left": 999 if drawable else 0, "unlimited": True}
    done = set(Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FOLLOW).values_list("work_id", flat=True))
    free_used = Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FREE).count()
    return {**base, "follow_left": [w for w in followed if w not in done], "free_left": max(0, FREE_DAILY - free_used) if drawable else 0}


def pick_card(work_id, pity, rng):
    """先抽稀有度再抽卡；這部作品沒有該稀有度就退到最接近的較低稀有度（沒有較低就往上）"""
    by_rarity = {}
    for c in Card.objects.filter(work_id=work_id, active=True):
        by_rarity.setdefault(c.rarity, []).append(c)
    if not by_rarity:
        return None
    rarity = roll_rarity(rng, pity=pity, allowed=set(by_rarity)) if pity and HIGH & set(by_rarity) else roll_rarity(rng)
    if rarity not in by_rarity:
        i = RARITIES.index(rarity)
        lower = [r for r in reversed(RARITIES[:i]) if r in by_rarity]
        higher = [r for r in RARITIES[i + 1:] if r in by_rarity]
        rarity = (lower or higher)[0]
    return rng.choice(by_rarity[rarity])


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
    cards.sync()
    day = today()
    free = unlimited(user)
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        pity = state.since_ssr + 1 >= PITY_AT
        drawable = drawable_work_ids()
        if work_id:
            if not Follow.objects.filter(user=user, work_id=work_id).exists():
                raise PullError("只能抽你追的作品")
            if work_id not in drawable:
                raise PullError("這部作品還沒有卡片")
            work = Work.objects.get(pk=work_id)
            # 不限次數的帳號記成隨機池，才不會被「同一部一天一次」擋下
            pool = Pull.Pool.FREE if free else Pull.Pool.FOLLOW
        else:
            if not free and Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FREE).count() >= FREE_DAILY:
                raise PullError("今天的隨機抽已經用完了，明天再來！")
            candidates = sorted(drawable)
            if pity:
                high = sorted(set(Card.objects.filter(active=True, rarity__in=HIGH).values_list("work_id", flat=True)))
                candidates = high or candidates
            if not candidates:
                raise PullError("目前還沒有卡片可以抽，敬請期待！")
            work = Work.objects.get(pk=rng.choice(candidates))
            pool = Pull.Pool.FREE
        card = pick_card(work.id, pity, rng)
        try:
            with transaction.atomic():
                p = Pull.objects.create(user=user, work=work, card=card, rarity=card.rarity, pool=pool, day=day, pity=pity)
        except IntegrityError:
            raise PullError("這部作品今天已經抽過了，明天再來！")
        state.total += 1
        state.since_ssr = 0 if card.rarity in HIGH else state.since_ssr + 1
        state.save()
        owned, created = OwnedCard.objects.get_or_create(user=user, card=card, defaults={"work": work, "rarity": card.rarity})
        if not created:
            owned.count += 1
            owned.save(update_fields=["count", "last_at"])
    return p, created
