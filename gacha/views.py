from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse, JsonResponse
from django.views.decorators.http import require_GET, require_POST

from dramas.models import Work

from . import cards, service
from .models import FREE_DAILY, PITY_AT, RARITIES, RARITY_LABEL, RARITY_WEIGHT, Card, OwnedCard


def _json(data, status=200):
    return JsonResponse(data, status=status, json_dumps_params={"ensure_ascii": False})


def _card(card, work_title, owned=None, new=False):
    return {"card_id": card.id, "work_id": card.work_id, "title": work_title, "name": card.name,
            "rarity": card.rarity, "rarity_label": RARITY_LABEL[card.rarity], "image": cards.image_url(card),
            "owned": owned is not None, "count": owned.count if owned else 0, "new": new,
            "first_at": owned.first_at.astimezone(service.TW).strftime("%Y/%m/%d") if owned else ""}


def _cover(work):
    """作品在抽卡畫面的封面：用這部作品（系列）最早加入的卡面"""
    card = service.cards_for(work).order_by("id").first()
    return cards.image_url(card) if card else ""


def _status_json(user):
    s = service.status(user)
    works = Work.objects.filter(id__in=s["follow_left"]).only("id", "title", "franchise_id")
    s["follow_left"] = [{"id": w.id, "title": w.title, "image": _cover(w)} for w in works]
    s["free_daily"] = FREE_DAILY
    s["pity_at"] = PITY_AT
    s["rates"] = [{"rarity": r, "label": RARITY_LABEL[r], "percent": RARITY_WEIGHT[r] / 100} for r in RARITIES]
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
    try:
        work_id = int(request.POST.get("work_id") or 0) or None
        p, new = service.pull(request.user, work_id)
    except (ValueError, Work.DoesNotExist):
        return _json({"ok": False, "error": "找不到這部作品"}, 400)
    except service.PullError as e:
        return _json({"ok": False, "error": str(e)}, 400)
    out = _pulled(request.user, [(p, new)])
    return _json({"ok": True, "card": out[0], "cards": out, "pity": p.pity, "status": _status_json(request.user)})


@login_required
@require_POST
def pull_all(request):
    """追的作品今天還沒抽的一次全抽"""
    pairs = service.pull_all(request.user)
    if not pairs:
        return _json({"ok": False, "error": "今天追的作品都抽過了，明天再來！"}, 400)
    return _json({"ok": True, "cards": _pulled(request.user, pairs), "status": _status_json(request.user)})


@login_required
@require_GET
def album(request):
    """集卡冊：依作品分組，列出這部作品所有卡片（還沒抽到的前端顯示剪影），依稀有度排序"""
    cards.sync()
    owned = {o.card_id: o for o in OwnedCard.objects.filter(user=request.user).select_related("card", "work")}
    work_ids = {o.work_id for o in owned.values()}
    last = {}
    for o in owned.values():
        last[o.work_id] = max(last.get(o.work_id, o.last_at), o.last_at)
    titles = dict(Work.objects.filter(id__in=work_ids).values_list("id", "title"))
    # 這些作品目前所有可抽的卡＋已經抽到的（包含停用的舊卡）
    pool = {c.id: c for c in Card.objects.filter(work_id__in=work_ids, active=True)}
    pool.update({cid: o.card for cid, o in owned.items()})
    groups = {}
    for c in sorted(pool.values(), key=lambda c: (RARITIES.index(c.rarity), c.id)):
        groups.setdefault(c.work_id, []).append(_card(c, titles.get(c.work_id, ""), owned.get(c.id)))
    items = []
    for wid in sorted(groups, key=lambda w: last.get(w), reverse=True):
        cs = groups[wid]
        items.append({"work_id": wid, "title": titles.get(wid, ""), "cards": cs,
                      "have": sum(1 for c in cs if c["owned"]), "total": len(cs)})
    return _json({"rarities": RARITIES, "labels": RARITY_LABEL, "works": items,
                  "summary": {"works": len(items), "kinds": len(owned), "pulls": sum(o.count for o in owned.values())}})
