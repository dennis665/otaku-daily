"""
抽卡的延伸玩法
- 🏆 組合羈絆：卡面庫 index.json 的 combos 定義每部作品的組合（例：池袋三兄弟），每位角色至少有 1 張卡就集齊，送 成員數 × COMBO_DUST_PER_MEMBER 星塵（每組只送一次）
  角色＝卡名第一個空白前的字（「山田一郎 萬事屋領導」→ 山田一郎）；年齡版本「費倫（幼年）」也算「費倫」
- 🏅 收集稱號：某部作品收集 50％／100％、全部作品合計收集到 KIND_TITLES 種卡就解鎖稱號（解鎖後永久保留），可以選一個顯示
  作品稱號名稱在 index.json 的 titles（{作品編號: {"50": ..., "100": ...}}），沒設定就用「<作品> 收藏家」「<作品> 全制霸」
- ⭐ 展示櫃：自己選最多 SHOWCASE_MAX 張已收集的卡，放在抽卡分頁最上面
- 🎵 聽歌猜作品：播一段動畫歌（追劇庫作品的主題曲），四選一猜是哪部作品
- 💬 名言猜猜看：經典台詞（gacha/data/quotes.json），四選一猜是哪部作品的誰說的
  兩種題型各自每天 QUIZ_DAILY 題，答對送 QUIZ_REWARD 星塵
"""
import json
import random
import re
import urllib.parse
from pathlib import Path

from django.db import transaction

from dramas.models import Work

from . import cards
from .models import (COMBO_DUST_PER_MEMBER, KIND_TITLES, QUIZ_DAILY, QUIZ_REWARD, SHOWCASE_MAX, Card, ComboReward, GachaState,
                     OwnedCard, QuizQuestion)


class ExtraError(Exception):
    pass


def char_of(name):
    return (name or "").split(" ")[0]


def _has_char(chars, ch):
    return any(x == ch or x.startswith(ch + "（") for x in chars)


def _add_notice(old, msg):
    return ("；".join(x for x in (old, msg) if x))[:200]


def collection(user):
    """各作品（卡片所在的作品編號）收集度與已收集的角色：{作品編號: {"title", "have", "total", "chars"}}"""
    owned = set(OwnedCard.objects.filter(user=user).values_list("card_id", flat=True))
    out = {}
    for c in Card.objects.filter(active=True).exclude(file="").select_related("work", "work__franchise"):
        sid = str(c.work.source_id)
        d = out.setdefault(sid, {"title": c.work.franchise.name if c.work.franchise else c.work.title,
                                 "have": 0, "total": 0, "chars": set()})
        d["total"] += 1
        if c.id in owned:
            d["have"] += 1
            d["chars"].add(char_of(c.name))
    return out, owned


def combo_list(user, coll=None):
    """所有組合羈絆與進度"""
    coll = coll if coll is not None else collection(user)[0]
    claimed = set(ComboReward.objects.filter(user=user).values_list("key", flat=True))
    items = []
    for sid, lst in cards.combos().items():
        info = coll.get(sid)
        if not info:
            continue   # 這部作品目前沒有卡
        for cb in lst:
            chars = [str(x) for x in (cb.get("chars") or [])]
            if not chars or not cb.get("name"):
                continue
            key = f"{sid}:{cb['name']}"[:120]
            have = [_has_char(info["chars"], ch) for ch in chars]
            items.append({"key": key, "work": info["title"], "name": cb["name"],
                          "chars": [{"name": ch, "have": h} for ch, h in zip(chars, have)],
                          "done": all(have), "claimed": key in claimed, "reward": COMBO_DUST_PER_MEMBER * len(chars)})
    return items


def title_rules(coll):
    """目前所有稱號與解鎖條件：[(稱號, 是否達成, 條件說明)]"""
    names = cards.work_titles()
    rules = []
    kinds = sum(d["have"] for d in coll.values())
    for need, name in KIND_TITLES:
        rules.append((name, kinds >= need, f"全部作品合計收集 {need} 種卡"))
    for sid, d in sorted(coll.items(), key=lambda x: x[1]["title"]):
        t = names.get(sid) or {}
        pct = d["have"] / d["total"] * 100 if d["total"] else 0
        rules.append((t.get("50") or f"{d['title']} 收藏家", pct >= 50, f"{d['title']} 收集 50%"))
        rules.append((t.get("100") or f"{d['title']} 全制霸", pct >= 100, f"{d['title']} 收集 100%"))
    return rules


def check_rewards(user):
    """發放新集齊的組合羈絆星塵、解鎖新稱號（打開抽卡分頁、抽卡後都會檢查）"""
    coll, _ = collection(user)
    if not coll:
        return
    combos = [c for c in combo_list(user, coll) if c["done"] and not c["claimed"]]
    rules = title_rules(coll)
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        changed = False
        for c in combos:
            _, created = ComboReward.objects.get_or_create(user=user, key=c["key"])
            if created:
                state.stardust += c["reward"]
                state.notice = _add_notice(state.notice, f"🏆 集齊組合「{c['name']}」！獲得 ✨ {c['reward']} 星塵")
                changed = True
        unlocked = list(state.titles or [])
        for name, ok, _ in rules:
            if ok and name not in unlocked:
                unlocked.append(name)
                state.notice = _add_notice(state.notice, f"🏅 解鎖稱號「{name}」")
                if not state.title:
                    state.title = name
                changed = True
        if changed:
            state.titles = unlocked
            state.save()


def set_title(user, title):
    state, _ = GachaState.objects.get_or_create(user=user)
    if title and title not in (state.titles or []):
        raise ExtraError("還沒有解鎖這個稱號")
    state.title = title or ""
    state.save(update_fields=["title"])


def showcase_cards(user, state=None):
    state = state or GachaState.objects.filter(user=user).first()
    ids = [int(x) for x in (state.showcase if state else []) or []]
    owned = {o.card_id: o for o in OwnedCard.objects.filter(user=user, card_id__in=ids).select_related("card", "card__work", "card__work__franchise")}
    return [owned[i] for i in ids if i in owned]


def toggle_showcase(user, card_id):
    """展示櫃：沒放的放進去（最多 SHOWCASE_MAX 張），已放的拿出來；回傳是否在展示櫃"""
    if not OwnedCard.objects.filter(user=user, card_id=card_id).exists():
        raise ExtraError("只能展示已經收集到的卡")
    with transaction.atomic():
        state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
        ids = [int(x) for x in state.showcase or []]
        if card_id in ids:
            ids.remove(card_id)
            on = False
        else:
            ids = [i for i in ids if OwnedCard.objects.filter(user=user, card_id=i).exists()]
            if len(ids) >= SHOWCASE_MAX:
                raise ExtraError(f"展示櫃最多放 {SHOWCASE_MAX} 張，先拿掉一張再放")
            ids.append(card_id)
            on = True
        state.showcase = ids
        state.save(update_fields=["showcase"])
    return on


# ---------- 🎵 聽歌猜作品 ----------
_SEASON = re.compile(r"\s*(第[一二三四五六七八九十\d]+[季期部]|season\s*\d+|\d+(st|nd|rd|th)\s*season|劇場版|OVA)\s*", re.I)


def _base(title):
    return _SEASON.sub("", title or "").strip()


def quiz_pool():
    """可以出題的作品：{作品名: [歌曲網址]}（追劇庫作品的主題曲，影音庫裡找得到檔案的才算）"""
    from player.playlist import audio_urls
    urls = audio_urls()
    pool = {}
    for w in Work.objects.exclude(mp3_links=[]).select_related("franchise"):
        title = w.franchise.name if w.franchise else _base(w.title) or w.title
        for link in w.mp3_links or []:
            name = urllib.parse.unquote((link.get("url") or "").rsplit("/", 1)[-1]).rsplit(".", 1)[0]
            if name in urls and urls[name] not in pool.get(title, []):
                pool.setdefault(title, []).append(urls[name])
    return pool


def _similar(a, b):
    return a in b or b in a or a[:4] == b[:4]


QUOTES_FILE = Path(__file__).parent / "data" / "quotes.json"


def quotes():
    """經典名言：[{"quote", "who", "work"}]"""
    try:
        return [q for q in json.loads(QUOTES_FILE.read_text(encoding="utf-8")) if q.get("quote") and q.get("who") and q.get("work")]
    except (OSError, ValueError):
        return []


def quote_label(q):
    return f"{q['who']}（{q['work']}）"


def quiz_today(user, day, kind="song"):
    return list(QuizQuestion.objects.filter(user=user, day=day, kind=kind))


def _new_quote(user, day, rng):
    items = quotes()
    labels = sorted({quote_label(q) for q in items})
    if len(labels) < 4:
        raise ExtraError("名言還不夠出題，敬請期待")
    recent = set(QuizQuestion.objects.filter(user=user, kind="quote").order_by("-id").values_list("prompt", flat=True)[:20])
    q = rng.choice([x for x in items if x["quote"] not in recent] or items)
    answer = quote_label(q)
    same = [l for l in labels if l != answer and l.endswith(f"（{q['work']}）")]   # 同作品的其他角色當干擾選項
    others = [l for l in labels if l != answer and l not in same]
    picks = rng.sample(same, min(1, len(same)))
    picks += rng.sample(others, 3 - len(picks))
    options = picks + [answer]
    rng.shuffle(options)
    return QuizQuestion.objects.create(user=user, day=day, kind="quote", prompt=q["quote"], answer=answer, options=options)


def quiz_next(user, day, unlimited=False, rng=random, kind="song"):
    """出下一題（還有沒回答的題目就回傳那題）"""
    if kind not in QuizQuestion.KINDS:
        raise ExtraError("沒有這種題型")
    qs = quiz_today(user, day, kind)
    pending = [q for q in qs if q.correct is None]
    if pending:
        return pending[0]
    if len(qs) >= QUIZ_DAILY and not unlimited:
        raise ExtraError("今天的題目答完了，明天再來！")
    if kind == "quote":
        return _new_quote(user, day, rng)
    pool = quiz_pool()
    if len(pool) < 4:
        raise ExtraError("歌曲還不夠出題，敬請期待")
    recent = {q.answer for q in QuizQuestion.objects.filter(user=user, kind="song").order_by("-id")[:15]}
    answer = rng.choice([t for t in pool if t not in recent] or list(pool))
    others = [t for t in pool if not _similar(t, answer)]
    options = rng.sample(others, 3) + [answer]
    rng.shuffle(options)
    return QuizQuestion.objects.create(user=user, day=day, kind="song", song_url=rng.choice(pool[answer]), answer=answer, options=options)


def quiz_answer(user, qid, picked):
    """回答：答對送星塵；回傳 (題目, 得到的星塵)"""
    with transaction.atomic():
        q = QuizQuestion.objects.select_for_update().filter(user=user, id=qid).first()
        if not q:
            raise ExtraError("找不到這一題")
        if q.correct is not None:
            raise ExtraError("這一題已經回答過了")
        if picked not in q.options:
            raise ExtraError("請從選項裡選一個")
        q.picked = picked
        q.correct = picked == q.answer
        q.save(update_fields=["picked", "correct"])
        gain = 0
        if q.correct:
            state, _ = GachaState.objects.select_for_update().get_or_create(user=user)
            state.stardust += QUIZ_REWARD
            state.save(update_fields=["stardust"])
            gain = QUIZ_REWARD
    return q, gain
