from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST

from dramas.models import Work

from . import service
from .models import RARITIES, RARITY_LABEL, OwnedCard


def _json(data, status=200):
    return JsonResponse(data, status=status, json_dumps_params={"ensure_ascii": False})


def _card(work, rarity, count=1, new=False):
    images = work.images or []
    # 稀有度越高用越後面的圖（作品有多張圖時，每個稀有度卡面不同）
    img = images[min(RARITIES.index(rarity), len(images) - 1)] if images else ""
    return {"work_id": work.id, "title": work.title, "rarity": rarity, "rarity_label": RARITY_LABEL[rarity],
            "image": img, "count": count, "new": new}


@login_required
@require_GET
def status(request):
    s = service.status(request.user)
    works = Work.objects.filter(id__in=s["follow_left"]).only("id", "title", "images")
    s["follow_left"] = [{"id": w.id, "title": w.title, "image": (w.images or [""])[0]} for w in works]
    return _json(s)


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
    count = OwnedCard.objects.get(user=request.user, work=p.work, rarity=p.rarity).count
    return _json({"ok": True, "card": _card(p.work, p.rarity, count, new), "pity": p.pity})


@login_required
@require_GET
def album(request):
    """集卡冊：依作品分組，每部 6 格（沒收集到的前端顯示剪影）"""
    groups = {}
    for c in OwnedCard.objects.filter(user=request.user).select_related("work").order_by("-last_at"):
        g = groups.setdefault(c.work_id, {"work_id": c.work_id, "title": c.work.title, "cards": {}})
        g["cards"][c.rarity] = _card(c.work, c.rarity, c.count)
    items = [{**g, "have": len(g["cards"]), "total": len(RARITIES)} for g in groups.values()]
    return _json({"rarities": RARITIES, "labels": RARITY_LABEL, "works": items})


@login_required
def page(request):
    """簡易抽卡頁（測試站限定，正式版畫面完成前先用來試玩）"""
    from django.conf import settings
    from django.http import Http404
    from django.shortcuts import render
    if getattr(settings, "APP_ENV", "") != "staging":
        raise Http404
    return render(request, "gacha/page.html")
