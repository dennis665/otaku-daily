from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse, JsonResponse
from django.views.decorators.http import require_GET, require_POST

from dramas.models import Work

from . import cards, extras, service
from .models import (CARD_PRICE, DUST_VALUE, FREE_DAILY, PICK_DAILY, PITY_AT, QUIZ_DAILY, QUIZ_REWARD, RARITIES, RARITY_LABEL,
                     RARITY_WEIGHT, SHOWCASE_MAX, TICKET_PRICE, Card, OwnedCard)


def _json(data, status=200):
    res = JsonResponse(data, status=status, json_dumps_params={"ensure_ascii": False})
    res["Cache-Control"] = "no-store"   # 抽卡狀態、問答等每次都要最新，不讓瀏覽器或中間層沿用舊回應
    return res


def _card(card, work_title, owned=None, new=False):
    title = card.work.franchise.name if (card.work and card.work.franchise) else work_title
    return {"card_id": card.id, "work_id": card.work_id, "title": title, "name": card.name, "no": card.no,
            "rarity": card.rarity, "rarity_label": RARITY_LABEL[card.rarity], "image": cards.image_url(card),
            "back_image": cards.card_back_url(card.work),
            "owned": owned is not None, "count": owned.count if owned else 0, "new": new,
            "first_at": owned.first_at.astimezone(service.TW).strftime("%Y/%m/%d") if owned else ""}


def _cover(work):
    """作品在抽卡畫面的封面：優先使用專屬卡圖/卡背，若無則用最早加入的卡面"""
    back = cards.card_back_url(work)
    if back:
        return back
    card = service.cards_for(work).order_by("id").first()
    return cards.image_url(card) if card else ""


def _status_json(user):
    s = service.status(user)
    # 可以自選的卡包（每個系列一個，追的作品排前面）
    s["works"] = [{"id": w.id, "title": w.franchise.name if w.franchise else w.title, "image": _cover(w),
                   "card_back": cards.card_back_url(w), "followed": followed}
                  for w, followed in service.pick_works(user)]
    s["free_daily"] = FREE_DAILY
    s["pick_daily"] = PICK_DAILY
    s["dust_value"] = DUST_VALUE
    s["card_price"] = CARD_PRICE
    s["ticket_price"] = TICKET_PRICE
    s["pity_at"] = PITY_AT
    s["rates"] = [{"rarity": r, "label": RARITY_LABEL[r], "percent": RARITY_WEIGHT[r] / 100} for r in RARITIES]
    s["showcase"] = [_card(o.card, o.card.work.title, o) for o in extras.showcase_cards(user)]
    s["showcase_max"] = SHOWCASE_MAX
    return s


@login_required
@require_GET
def image(request, file):
    """卡面圖片（卡面庫不公開，由本站代為讀取；只有登入的人看得到）。檔名含內容指紋，內容不會變，可以長期快取"""
    try:
        data = cards.image_bytes(file)
    except Exception:
        raise Http404
    res = HttpResponse(data, content_type="image/webp")
    res["Cache-Control"] = "private, max-age=31536000, immutable"
    return res


@login_required
@require_GET
def status(request):
    return _json(_status_json(request.user))


def _pulled(user, pairs):
    owned = {o.card_id: o for o in OwnedCard.objects.filter(user=user, card_id__in=[p.card_id for p, _ in pairs])}
    return [{**_card(p.card, p.card.work.title, owned.get(p.card_id), new), "pity": p.pity} for p, new in pairs]


@login_required
@require_POST
def pull(request):
    """抽卡：work_id＝自選作品（用自選券），沒有＝隨機大混池（用隨機券）；count＝連抽張數（1～10，券不夠抽到用完）"""
    try:
        work_id = int(request.POST.get("work_id") or 0) or None
        count = int(request.POST.get("count") or 1)
        pairs = service.pull_many(request.user, work_id, count)
    except (ValueError, Work.DoesNotExist):
        return _json({"ok": False, "error": "找不到這部作品"}, 400)
    except service.PullError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    out = _pulled(request.user, pairs)
    return _json({"ok": True, "card": out[0], "cards": out, "pity": any(c["pity"] for c in out), "status": _status_json(request.user)})


@login_required
@require_POST
def heartbeat(request):
    """App 在前景時每分鐘回報一次，累積當天在線時間（每日任務用）"""
    return _json({"ok": True, "task": service.heartbeat(request.user)})


@login_required
@require_POST
def claim_task(request):
    """領取每日在線任務獎勵"""
    try:
        service.claim_task(request.user)
    except service.PullError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "status": _status_json(request.user)})


@login_required
@require_POST
def dismantle(request):
    """分解重複卡：card_id＋n＝分解這張 n 張；all=1＝所有重複卡全部分解（每張保留 1 張）"""
    try:
        card_id = None if request.POST.get("all") else int(request.POST.get("card_id") or 0)
        gain, cnt = service.dismantle(request.user, card_id, int(request.POST.get("n") or 1))
    except ValueError:
        return _json({"ok": False, "error": "資料格式錯誤"}, 400)
    except service.PullError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "gain": gain, "count": cnt, "status": _status_json(request.user)})


@login_required
@require_POST
def shop(request):
    """星塵兌換：kind=ticket＋n＝自選抽卡券；kind=card＋card_id＝指定的卡"""
    try:
        if request.POST.get("kind") == "card":
            card = service.buy_card(request.user, int(request.POST.get("card_id") or 0))
            bought = {"card_id": card.id, "rarity": card.rarity, "name": card.name}
        else:
            n = int(request.POST.get("n") or 1)
            service.buy_tickets(request.user, n)
            bought = {"tickets": n}
    except ValueError:
        return _json({"ok": False, "error": "資料格式錯誤"}, 400)
    except service.PullError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "bought": bought, "status": _status_json(request.user)})


@login_required
@require_GET
def album(request):
    """集卡冊：依系列/作品分組，列出這部作品所有卡片（還沒抽到的前端顯示剪影），依稀有度排序"""
    cards.sync()
    owned = {o.card_id: o for o in OwnedCard.objects.filter(user=request.user).select_related("card", "work", "work__franchise")}
    work_ids = {o.work_id for o in owned.values()}
    last = {}
    for o in owned.values():
        last[o.work_id] = max(last.get(o.work_id, o.last_at), o.last_at)
    works = {w.id: w for w in Work.objects.filter(id__in=work_ids).select_related("franchise")}
    # 這些作品目前所有可抽的卡＋已經抽到的（包含停用的舊卡）
    pool = {c.id: c for c in Card.objects.filter(work_id__in=work_ids, active=True).select_related("work", "work__franchise")}
    pool.update({cid: o.card for cid, o in owned.items() if o.card})
    groups = {}
    for c in sorted(pool.values(), key=lambda c: (c.no or 9999, c.id)):
        w = works.get(c.work_id) or c.work
        title = w.franchise.name if (w and w.franchise) else (w.title if w else "")
        groups.setdefault(c.work_id, []).append(_card(c, title, owned.get(c.id)))
    items = []
    for wid in sorted(groups, key=lambda w: last.get(w), reverse=True):
        cs = groups[wid]
        w = works.get(wid)
        title = w.franchise.name if (w and w.franchise) else (w.title if w else "")
        items.append({"work_id": wid, "title": title, "cards": cs,
                      "have": sum(1 for c in cs if c["owned"]), "total": len(cs)})
    return _json({"rarities": RARITIES, "labels": RARITY_LABEL, "works": items,
                  "summary": {"works": len(items), "kinds": len(owned), "pulls": sum(o.count for o in owned.values())}})


# ---------- 🏆 組合羈絆、🏅 收集稱號、⭐ 展示櫃 ----------
@login_required
@require_GET
def achievements(request):
    """組合羈絆進度與所有稱號（已解鎖／條件）"""
    cards.sync()
    extras.check_rewards(request.user)
    coll, _ = extras.collection(request.user)
    state = service.GachaState.objects.filter(user=request.user).first()
    unlocked = set(state.titles if state else [])
    titles = [{"name": n, "unlocked": n in unlocked, "rule": rule} for n, _, rule in extras.title_rules(coll)]
    titles += [{"name": n, "unlocked": True, "rule": ""} for n in unlocked if n not in {t["name"] for t in titles}]
    return _json({"combos": extras.combo_list(request.user, coll), "titles": titles,
                  "title": state.title if state else "", "notice": state.notice if state else ""})


@login_required
@require_POST
def set_title(request):
    try:
        extras.set_title(request.user, (request.POST.get("title") or "").strip())
    except extras.ExtraError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "title": request.POST.get("title") or ""})


@login_required
@require_POST
def showcase(request):
    """展示櫃：card_id 沒放的放進去、已放的拿出來"""
    try:
        on = extras.toggle_showcase(request.user, int(request.POST.get("card_id") or 0))
    except ValueError:
        return _json({"ok": False, "error": "資料格式錯誤"}, 400)
    except extras.ExtraError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "on": on, "status": _status_json(request.user)})


# ---------- 🎵 聽歌猜作品 ----------
def _kind(request):
    k = request.GET.get("kind") or request.POST.get("kind") or "song"
    return k if k in ("song", "quote") else "song"


def _quiz_json(user, q=None, kind="song"):
    day = service.today()
    qs = extras.quiz_today(user, day, kind)
    done = [x for x in qs if x.correct is not None]
    unlimited = service.unlimited(user)
    out = {"kind": kind, "daily": QUIZ_DAILY, "reward": QUIZ_REWARD, "unlimited": unlimited,
           "left": 999 if unlimited else max(0, QUIZ_DAILY - len(qs)) + sum(1 for x in qs if x.correct is None),
           "right": sum(1 for x in done if x.correct), "answered": len(done)}
    pending = q if (q and q.correct is None) else next((x for x in qs if x.correct is None), None)
    out["question"] = ({"id": pending.id, "url": pending.song_url, "prompt": pending.prompt, "options": pending.options}
                       if pending else None)
    # 今天已經回答的題目（新的在前）：題目、你的回答、正確答案
    out["history"] = [{"url": x.song_url, "prompt": x.prompt, "picked": x.picked, "answer": x.answer, "correct": x.correct}
                      for x in reversed(done[-30:])]
    return out


@login_required
@require_GET
def quiz(request):
    return _json(_quiz_json(request.user, kind=_kind(request)))


@login_required
@require_POST
def quiz_next(request):
    kind = _kind(request)
    try:
        q = extras.quiz_next(request.user, service.today(), service.unlimited(request.user), kind=kind)
    except extras.ExtraError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, **_quiz_json(request.user, q, kind)})


@login_required
@require_POST
def quiz_answer(request):
    try:
        q, gain = extras.quiz_answer(request.user, int(request.POST.get("id") or 0), request.POST.get("pick") or "")
    except ValueError:
        return _json({"ok": False, "error": "資料格式錯誤"}, 400)
    except extras.ExtraError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    return _json({"ok": True, "correct": q.correct, "answer": q.answer, "gain": gain, **_quiz_json(request.user, kind=q.kind)})

