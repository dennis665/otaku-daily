"""追劇小幫手 API"""
import hashlib
import hmac
import json
import time
from datetime import date, timedelta

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db.models import Count, Q
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import Airing, Follow, Work, normalize
from .sync import upsert_works

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


@login_required
@require_GET
def mine(request):
    """我的追劇：依最新播出排序，可搜尋"""
    ids = _my_ids(request.user)
    qs = _works_qs().filter(id__in=ids)
    q = normalize(request.GET.get("q", ""))
    if q:
        qs = qs.filter(search_text__contains=q)
    return JsonResponse({"items": [serialize(w, ids) for w in qs.order_by("-sort_key", "title")], "total": len(ids)})


@login_required
@require_GET
def works(request):
    """探索劇庫：依播出季度／上映年份篩選、搜尋、分頁"""
    ids = _my_ids(request.user)
    qs = _works_qs()
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
    page = Paginator(qs.distinct().order_by("-sort_key", "title"), PAGE_SIZE).get_page(request.GET.get("page") or 1)
    return JsonResponse({
        "items": [serialize(w, ids) for w in page.object_list],
        "page": page.number, "pages": page.paginator.num_pages, "count": page.paginator.count,
    })


_filter_cache = {"at": 0.0, "data": None}


@login_required
@require_GET
def filters(request):
    """探索頁的篩選選項：各季新番、日版／台版電影年份、動畫化決定（快取 10 分鐘）"""
    if _filter_cache["data"] is None or time.time() - _filter_cache["at"] > 600:
        rows = Airing.objects.values("label", "kind", "year", "month").annotate(n=Count("work", distinct=True))
        seasons = sorted((r for r in rows if r["kind"] == Airing.Kind.SEASON), key=lambda r: (r["year"], r["month"]), reverse=True)
        movies = sorted((r for r in rows if r["kind"] in (Airing.Kind.JP_MOVIE, Airing.Kind.TW_MOVIE)), key=lambda r: (r["year"], r["kind"]), reverse=True)
        others = [r for r in rows if r["kind"] in (Airing.Kind.ANNOUNCED, Airing.Kind.MOVIE_ANNOUNCED)]
        today = date.today()
        current = f"{today.year}年{((today.month - 1) // 3) * 3 + 1}月新番"
        _filter_cache["data"] = {
            "current": current,
            "seasons": [{"label": r["label"], "n": r["n"]} for r in seasons],
            "movies": [{"label": r["label"], "n": r["n"]} for r in movies],
            "others": [{"label": r["label"], "n": r["n"]} for r in others],
            "total": Work.objects.count(),
        }
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


# ---------- 一次性：舊劇庫搬家（使用者要求，2026-11-05；搬完移除） ----------
MIGRATE_TOKEN_SHA256 = "abe01a7661dabf8b11a880ed429a0847d358df31e885ca15360928be39409a22"


@csrf_exempt
@require_POST
def one_time_migrate(request):
    token = request.headers.get("X-Import-Token", "")
    if not hmac.compare_digest(hashlib.sha256(token.encode()).hexdigest(), MIGRATE_TOKEN_SHA256):
        raise Http404
    data = json.loads(request.body)
    stats = upsert_works(data.get("works", []), mode="migrate")
    followed = {}
    for username, sids in (data.get("follows") or {}).items():
        user = User.objects.filter(username=username).first()
        if not user:
            followed[username] = "找不到帳號"
            continue
        wids = Work.objects.filter(source_id__in=sids).values_list("id", flat=True)
        Follow.objects.bulk_create([Follow(user=user, work_id=i) for i in wids], ignore_conflicts=True)
        followed[username] = Follow.objects.filter(user=user).count()
    _dup_cache["at"] = _filter_cache["at"] = 0
    stats.pop("need_images", None)
    return JsonResponse({"ok": True, **stats, "follows": followed, "total_works": Work.objects.count()}, json_dumps_params={"ensure_ascii": False})
