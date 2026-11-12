"""
抽卡邏輯：機率、保底、抽卡券、每日任務（台灣時間 00:00 重置）
- 自選抽卡券：每天 PICK_DAILY 張（當天有效），自己選有卡片的任何作品抽
- 隨機抽卡券：每天 FREE_DAILY 張（當天有效），從全部作品的大混池抽
- 保留券：每日任務（當天 App 累積在線 TASK_SECONDS 秒）送 TASK_REWARD 張自選券，不會過期、可累積；自選抽時先用當天的券再用保留券
- 卡片以「作品系列」共用：卡掛在系列裡任何一部（通常是第一季），追同系列的任何一季都抽得到整個系列的卡
- 只有「本身或同系列有卡片」的作品抽得到
"""
import random
from datetime import datetime, timedelta, timezone

from django.conf import settings
from django.db import IntegrityError, models, transaction
from django.utils import timezone as dj_tz

from dramas.models import Follow, Work

from . import cards
from .models import (CARD_PRICE, DUST_VALUE, FREE_DAILY, PICK_DAILY, PITY_AT, RARITIES, RARITY_WEIGHT, TASK_REWARD, TASK_SECONDS,
                     TICKET_PRICE, Card, GachaDay, GachaState, OwnedCard, Pull)

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


def card_work_ids():
    """卡片直接掛的作品（全作品隨機池從這裡抽）"""
    return set(Card.objects.filter(active=True).values_list("work_id", flat=True))


def drawable_work_ids(work_ids=None):
    """抽得到的作品：本身有卡，或同系列有卡；work_ids 有給就只判斷這些"""
    have = card_work_ids()
    franchises = set(Work.objects.filter(id__in=have).exclude(franchise=None).values_list("franchise_id", flat=True))
    qs = Work.objects.filter(id__in=work_ids) if work_ids is not None else Work.objects.all()
    return have | set(qs.filter(franchise_id__in=franchises).values_list("id", flat=True))


def canonical_work(work):
    """取得該作品在卡包所屬的系列代表作品（各系列作品只會有一種卡包，沒有分各季）"""
    if not work or not work.franchise_id:
        return work
    cand = Work.objects.filter(franchise_id=work.franchise_id, gacha_cards__active=True).order_by("id").first()
    return cand or work


def cards_for(work):
    """這部作品抽得到的卡：自己的＋同系列的"""
    qs = Card.objects.filter(active=True)
    if work.franchise_id:
        return qs.filter(models.Q(work=work) | models.Q(work__franchise_id=work.franchise_id))
    return qs.filter(work=work)


def pick_works(user):
    """可以自選的卡包：每個有卡片的系列一個（追的作品排前面）；回傳 [(Work, 是否有追)]"""
    reps = {}
    for w in Work.objects.filter(id__in=card_work_ids()).select_related("franchise"):
        c = canonical_work(w)
        reps[c.id] = c
    follows = set(Follow.objects.filter(user=user).values_list("work_id", flat=True))
    follow_fr = set(Work.objects.filter(id__in=follows).exclude(franchise=None).values_list("franchise_id", flat=True))
    out = [(w, w.id in follows or (w.franchise_id in follow_fr if w.franchise_id else False)) for w in reps.values()]
    return sorted(out, key=lambda x: (not x[1], (x[0].franchise.name if x[0].franchise else x[0].title)))


def task_status(user, day=None):
    d = GachaDay.objects.filter(user=user, day=day or today()).first()
    secs = d.online_seconds if d else 0
    claimed = bool(d and d.task_claimed)
    return {"seconds": min(secs, TASK_SECONDS), "need": TASK_SECONDS, "reward": TASK_REWARD,
            "claimed": claimed, "claimable": secs >= TASK_SECONDS and not claimed}


def status(user):
    """今天剩幾張券、保留券、任務進度"""
    cards.sync()
    from .extras import check_rewards
    check_rewards(user)   # 新集齊的組合羈絆、新解鎖的稱號
    day = today()
    state = GachaState.objects.filter(user=user).first()
    has_cards = bool(card_work_ids())
    base = {"day": day.isoformat(), "pity_left": PITY_AT - (state.since_ssr if state else 0),
            "pool_works": len(card_work_ids()), "bonus": state.bonus_tickets if state else 0, "task": task_status(user, day),
            "stardust": state.stardust if state else 0, "notice": state.notice if state else "",
            "title": state.title if state else ""}
    if state and state.notice:   # 通知只顯示一次
        GachaState.objects.filter(pk=state.pk).update(notice="")
    if unlimited(user):
        return {**base, "pick_left": 999, "random_left": 999 if has_cards else 0, "unlimited": True}
    used = Pull.objects.filter(user=user, day=day)
    return {**base,
            "pick_left": max(0, PICK_DAILY - used.filter(pool=Pull.Pool.PICK, ticket="daily").count()),
            "random_left": max(0, FREE_DAILY - used.filter(pool=Pull.Pool.FREE).count()) if has_cards else 0}


# ---------- 每日任務：App 在線時間 ----------
BEAT_EVERY = 30                 # 前端每 30 秒回報一次
BEAT_MIN, BEAT_MAX = 20, 75     # 間隔太短不算（防連按）、太長代表中間離開了


def heartbeat(user, now=None):
    """App 在前景時每分鐘呼叫一次，累積當天在線時間；回傳任務狀態"""
    now = now or dj_tz.now()
    with transaction.atomic():
        d, _ = GachaDay.objects.select_for_update().get_or_create(user=user, day=today())
        if d.last_beat:
            gap = (now - d.last_beat).total_seconds()
            if gap < BEAT_MIN:
                return task_status(user)          # 太快，不算也不更新時間
            if gap <= BEAT_MAX:
                d.online_seconds += int(min(gap, BEAT_EVERY + 5))
        d.last_beat = now
        d.save()
    return task_status(user)


def claim_task(user):
    """領取在線任務獎勵：自選抽卡券 TASK_REWARD 張（保留券）"""
    with transaction.atomic():
        d = GachaDay.objects.select_for_update().filter(user=user, day=today()).first()
        if not d or d.online_seconds < TASK_SECONDS:
            raise PullError(f"今天在線還不到 {TASK_SECONDS // 60} 分鐘")
        if d.task_claimed:
            raise PullError("今天的任務獎勵已經領過了")
        d.task_claimed = True
        d.save(update_fields=["task_claimed"])
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        state.bonus_tickets += TASK_REWARD
        state.save(update_fields=["bonus_tickets"])
    return state.bonus_tickets


def pick_card(work, pity, rng):
    """先抽稀有度再抽卡；這部作品（系列）沒有該稀有度就退到最接近的較低稀有度（沒有較低就往上）"""
    by_rarity = {}
    for c in cards_for(work):
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


def pull_many(user, work_id=None, count=1, rng=random):
    """連抽：有 work_id＝自選該作品；沒有＝隨機大混池。券不夠就抽到用完為止；回傳 [(Pull, 是否新卡)]"""
    out = []
    for i in range(max(1, min(int(count), 10))):
        try:
            out.append(pull(user, work_id, rng))
        except PullError:
            if not out:
                raise
            break
    return out


def pull(user, work_id=None, rng=random):
    """抽一張：有 work_id＝用自選抽卡券抽該作品（系列）；沒有＝用隨機抽卡券從大混池抽。回傳 (Pull, 是否新卡)"""
    cards.sync()
    day = today()
    free = unlimited(user)
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        pity = state.since_ssr + 1 >= PITY_AT
        ticket = ""
        if work_id:
            try:
                raw_work = Work.objects.select_related("franchise").get(pk=work_id)
            except Work.DoesNotExist:
                raise PullError("找不到這部作品")
            work = canonical_work(raw_work)
            if work.id not in drawable_work_ids([work.id]):
                raise PullError("這部作品還沒有卡片")
            if not free:
                used = Pull.objects.filter(user=user, day=day, pool=Pull.Pool.PICK, ticket="daily").count()
                if used < PICK_DAILY:
                    ticket = "daily"
                elif state.bonus_tickets > 0:
                    ticket = "bonus"
                    state.bonus_tickets -= 1
                else:
                    raise PullError("自選抽卡券用完了！完成每日任務可以拿到更多，或明天再來")
            pool = Pull.Pool.PICK
        else:
            if not free and Pull.objects.filter(user=user, day=day, pool=Pull.Pool.FREE).count() >= FREE_DAILY:
                raise PullError("今天的隨機抽卡券用完了，明天再來！")
            candidates = sorted(card_work_ids())
            if pity:
                high = sorted(set(Card.objects.filter(active=True, rarity__in=HIGH).values_list("work_id", flat=True)))
                candidates = high or candidates
            if not candidates:
                raise PullError("目前還沒有卡片可以抽，敬請期待！")
            work = Work.objects.get(pk=rng.choice(candidates))
            pool = Pull.Pool.FREE
        card = pick_card(work, pity, rng)
        if card is None:
            raise PullError("這部作品還沒有卡片")
        try:
            with transaction.atomic():
                p = Pull.objects.create(user=user, work=work, card=card, rarity=card.rarity, pool=pool, ticket=ticket, day=day, pity=pity)
        except IntegrityError:
            raise PullError("抽卡失敗，請再試一次")
        state.total += 1
        state.since_ssr = 0 if card.rarity in HIGH else state.since_ssr + 1
        state.save()
        owned, created = OwnedCard.objects.get_or_create(user=user, card=card, defaults={"work_id": card.work_id, "rarity": card.rarity})
        if not created:
            owned.count += 1
            owned.save(update_fields=["count", "last_at"])
    return p, created


# ---------- ✨ 星塵：分解重複卡、🛒 兌換 ----------
def dismantle(user, card_id=None, n=1):
    """分解重複的卡（每張卡至少保留 1 張）：card_id＝分解這張的 n 張；沒有 card_id＝所有重複卡全部分解。回傳 (得到星塵, 分解張數)"""
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        qs = OwnedCard.objects.select_for_update().filter(user=user, count__gt=1).select_related("card")
        if card_id:
            qs = qs.filter(card_id=card_id)
            if not qs.exists():
                raise PullError("只有重複的卡才能分解（每張至少保留 1 張）")
        gain = cnt = 0
        for o in qs:
            k = (o.count - 1) if not card_id else min(int(n), o.count - 1)
            if k <= 0:
                continue
            o.count -= k
            o.save(update_fields=["count"])
            gain += DUST_VALUE.get(o.card.rarity, 1) * k
            cnt += k
        if not cnt:
            raise PullError("目前沒有重複的卡可以分解")
        state.stardust += gain
        state.save(update_fields=["stardust"])
    return gain, cnt


def buy_tickets(user, n=1):
    """星塵兌換自選抽卡券（保留券，不會過期）"""
    n = max(1, min(int(n), 50))
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        cost = TICKET_PRICE * n
        if state.stardust < cost:
            raise PullError(f"星塵不夠：需要 {cost}，目前 {state.stardust}")
        state.stardust -= cost
        state.bonus_tickets += n
        state.save(update_fields=["stardust", "bonus_tickets"])
    return state


def buy_card(user, card_id):
    """星塵兌換一張還沒收集到的指定卡"""
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        card = Card.objects.filter(id=card_id, active=True).first()
        if not card:
            raise PullError("找不到這張卡")
        if OwnedCard.objects.filter(user=user, card=card).exists():
            raise PullError("這張卡你已經有了")
        cost = CARD_PRICE[card.rarity]
        if state.stardust < cost:
            raise PullError(f"星塵不夠：需要 {cost}，目前 {state.stardust}")
        state.stardust -= cost
        state.save(update_fields=["stardust"])
        OwnedCard.objects.create(user=user, card=card, work_id=card.work_id, rarity=card.rarity)
    return card
