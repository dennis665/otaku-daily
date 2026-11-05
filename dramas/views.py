"""追劇小幫手 API"""
import time
from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Count, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_GET, require_POST

from .models import Airing, Follow, Work, normalize

User = get_user_model()
PAGE_SIZE = 20
NEW_DAYS = 14

_dup_cache = {"at": 0.0, "titles": set()}


def _duplicate_titles():
    """名稱相同但其實是不同作品（例如重製版）的名稱清單，顯示時加上年份區分；快取 10 分鐘"""
    if time.time() - _dup_cache["at"] > 600:
        _dup_cache["titles"] = set(Work.objects.values("title").annotate(n=Count("id")).filter(n__gt=1).values_list("title", flat=True))
        _dup_cache["at"] = time.time()
    return _dup_cache["titles"]


def _airing_sort(a):
    # 有日期的依時間排，動畫化決定／製作決定放最前面（代表最早的消息）
    return "000000" if a.sort_key == "999999" else a.sort_key


def serialize(w, followed_ids):
    airings = sorted(w.airings.all(), key=_airing_sort)
    title = w.title
    if title in _duplicate_titles():
        years = [a.year for a in airings if a.year]
        if years:
            title = f"{title}（{min(years)}）"
    return {
        "id": w.id,
        "title": title,
        "alt_titles": w.alt_titles,
        "media": w.get_media_type_display(),
        "franchise": w.franchise.name if w.franchise else "",
        "images": w.images[:6],
        "info_url": w.info_url,
        "airings": [a.label for a in airings],
        "latest": airings[-1].label if airings else "",   # 有實際播出就是最新那季；只有動畫化決定才顯示它
        "mp3": w.mp3_links,
        "mp4": w.mp4_links,
        "followers": getattr(w, "n_followers", None),
        "followed": w.id in followed_ids,
        "is_new": bool(w.first_seen and w.first_seen >= date.today() - timedelta(days=NEW_DAYS)),
    }


def _works_qs():
    return Work.objects.select_related("franchise").prefetch_related("airings").annotate(n_followers=Count("follows", distinct=True))


def _my_ids(user):
    return set(Follow.objects.filter(user=user).values_list("work_id", flat=True))


SIZES = (5, 10, 20, 50)


def _page_size(request):
    try:
        size = int(request.GET.get("size") or PAGE_SIZE)
    except ValueError:
        size = PAGE_SIZE
    return size if size in SIZES else PAGE_SIZE


def _filtered(request, qs):
    label = request.GET.get("label", "")
    q = normalize(request.GET.get("q", ""))
    media = request.GET.get("media", "")
    if label:
        qs = qs.filter(airings__label=label)
    if q:
        qs = qs.filter(search_text__contains=q)
    if media in Work.Media.values:
        qs = qs.filter(media_type=media)
    if request.GET.get("only") == "new":
        qs = qs.filter(first_seen__gte=date.today() - timedelta(days=NEW_DAYS))
    return qs.distinct().order_by("-sort_key", "title")


def _page_json(request, qs, ids, extra=None):
    """只回傳目前這一頁（伺服器分頁，省流量也省手機記憶體）"""
    page = Paginator(qs, _page_size(request)).get_page(request.GET.get("page") or 1)
    return JsonResponse({
        "items": [serialize(w, ids) for w in page.object_list],
        "page": page.number, "pages": page.paginator.num_pages, "count": page.paginator.count,
        **(extra or {}),
    })


@login_required
@require_GET
def mine(request):
    """我的追劇：依最新播出排序，可搜尋、依分類篩選、分頁"""
    ids = _my_ids(request.user)
    return _page_json(request, _filtered(request, _works_qs().filter(id__in=ids)), ids, {"total": len(ids)})


@login_required
@require_GET
def works(request):
    """探索劇庫：依播出季度／上映年份篩選、搜尋、分頁"""
    ids = _my_ids(request.user)
    return _page_json(request, _filtered(request, _works_qs()), ids)


_filter_cache = {"at": 0.0, "data": None}


def _build_nav(rows, total):
    """分類導覽：季番（十年 → 年 → 季度）、動畫電影（十年 → 年 → 日版／台版），加上動畫化／製作決定"""
    def tree(items, sub_key):
        decades = {}
        for r in items:
            d = decades.setdefault(r["year"] // 10 * 10, {"decade": r["year"] // 10 * 10, "n": 0, "years": {}})
            y = d["years"].setdefault(r["year"], {"year": r["year"], "n": 0, "items": []})
            y["items"].append({"label": r["label"], "n": r["n"]})
            y["n"] += r["n"]
            d["n"] += r["n"]
        out = []
        for d in sorted(decades.values(), key=lambda x: -x["decade"]):
            years = sorted(d["years"].values(), key=lambda x: -x["year"])
            for y in years:
                y["items"].sort(key=sub_key)
            out.append({"decade": d["decade"], "n": d["n"], "years": years})
        return out

    pick = lambda kinds: [r for r in rows if r["kind"] in kinds and r["year"]]
    single = lambda kind: next(({"label": r["label"], "n": r["n"]} for r in rows if r["kind"] == kind), None)
    today = date.today()
    month_of = {r["label"]: r["month"] or 0 for r in rows}
    return {
        "current": f"{today.year}年{((today.month - 1) // 3) * 3 + 1}月新番",
        "total": total,
        "announced": single(Airing.Kind.ANNOUNCED),
        "movie_announced": single(Airing.Kind.MOVIE_ANNOUNCED),
        "tv": tree(pick({Airing.Kind.SEASON}), lambda i: -month_of.get(i["label"], 0)),
        "movie": tree(pick({Airing.Kind.JP_MOVIE, Airing.Kind.TW_MOVIE}), lambda i: i["label"]),
    }


def _nav_rows(work_ids=None):
    qs = Airing.objects.all()
    if work_ids is not None:
        qs = qs.filter(work_id__in=work_ids)
    return list(qs.values("label", "kind", "year", "month").annotate(n=Count("work", distinct=True)))


@login_required
@require_GET
def filters(request):
    """分類導覽的資料；scope=mine 時只算我的追劇（全部劇庫的版本快取 10 分鐘）"""
    if request.GET.get("scope") == "mine":
        ids = _my_ids(request.user)
        return JsonResponse(_build_nav(_nav_rows(ids), len(ids)), json_dumps_params={"ensure_ascii": False})
    if _filter_cache["data"] is None or time.time() - _filter_cache["at"] > 600:
        _filter_cache["data"] = _build_nav(_nav_rows(), Work.objects.count())
        _filter_cache["at"] = time.time()
    return JsonResponse(_filter_cache["data"], json_dumps_params={"ensure_ascii": False})


@login_required
@require_POST
def follow(request, pk):
    """加入／移出我的追劇"""
    w = get_object_or_404(Work, pk=pk)
    obj, created = Follow.objects.get_or_create(user=request.user, work=w)
    if not created:
        obj.delete()
    return JsonResponse({"ok": True, "followed": created})
