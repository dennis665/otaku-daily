from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from dramas.models import Work

from . import service
from .models import FREE_DAILY, PITY_AT, RARITIES, RARITY_LABEL, RARITY_WEIGHT, OwnedCard


def _json(data, status=200):
    return JsonResponse(data, status=status, json_dumps_params={"ensure_ascii": False})


def _card(work, rarity, count=1, new=False, first_at=None):
    images = work.images or []
    # 稀有度越高用越後面的圖（作品有多張圖時，每個稀有度卡面不同）
    img = images[min(RARITIES.index(rarity), len(images) - 1)] if images else ""
    return {"work_id": work.id, "title": work.title, "rarity": rarity, "rarity_label": RARITY_LABEL[rarity],
            "image": img, "count": count, "new": new,
            "first_at": first_at.astimezone(service.TW).strftime("%Y/%m/%d") if first_at else ""}


def _status_json(user):
    s = service.status(user)
    works = Work.objects.filter(id__in=s["follow_left"]).only("id", "title", "images")
    s["follow_left"] = [{"id": w.id, "title": w.title, "image": (w.images or [""])[0]} for w in works]
    s["free_daily"] = FREE_DAILY
    s["pity_at"] = PITY_AT
    s["rates"] = [{"rarity": r, "label": RARITY_LABEL[r], "percent": RARITY_WEIGHT[r] / 100} for r in RARITIES]
    return s


@login_required
@require_GET
def status(request):
    return _json(_status_json(request.user))


def _pulled(user, pairs):
    counts = {(c.work_id, c.rarity): c for c in OwnedCard.objects.filter(user=user, work_id__in=[p.work_id for p, _ in pairs])}
    out = []
    for p, new in pairs:
        oc = counts.get((p.work_id, p.rarity))
        out.append({**_card(p.work, p.rarity, oc.count if oc else 1, new, oc.first_at if oc else None), "pity": p.pity})
    return out


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
    card = _pulled(request.user, [(p, new)])[0]
    return _json({"ok": True, "card": card, "cards": [card], "pity": p.pity, "status": _status_json(request.user)})


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
    """集卡冊：依作品分組，每部 6 格（沒收集到的前端顯示剪影）"""
    groups = {}
    total = 0
    for c in OwnedCard.objects.filter(user=request.user).select_related("work").order_by("-last_at"):
        g = groups.setdefault(c.work_id, {"work_id": c.work_id, "title": c.work.title, "cards": {}})
        g["cards"][c.rarity] = _card(c.work, c.rarity, c.count, first_at=c.first_at)
        total += c.count
    items = [{**g, "have": len(g["cards"]), "total": len(RARITIES)} for g in groups.values()]
    kinds = sum(i["have"] for i in items)
    return _json({"rarities": RARITIES, "labels": RARITY_LABEL, "works": items,
                  "summary": {"works": len(items), "kinds": kinds, "pulls": total}})
