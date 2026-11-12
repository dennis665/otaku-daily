import hashlib
import json

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.views.decorators.cache import cache_control, never_cache
from django.views.decorators.http import require_http_methods, require_POST

from notifications.reminders import SCHEDULE_HINT

from .events import fetched_at, get_events
from .models import HIDEABLE_TABS, Playlist, UserPrefs
from .playlist import alias_map, get_playlist, resolve_song


@login_required
def home(request):
    playlist = get_playlist()
    return render(request, "player/home.html", {
        "playlist": playlist,
        "audio_count": sum(1 for s in playlist if s["audio"]),
        "video_count": sum(1 for s in playlist if s["video"]),
        "reminder_hint": SCHEDULE_HINT,
        "hidden_tabs": UserPrefs.hidden_for(request.user),
        "song_aliases": alias_map(),
    })


# ---------- 個人設定與自訂歌單 ----------
MAX_PLAYLISTS = 50
MAX_SONGS = 1000


def _body(request):
    try:
        data = json.loads(request.body or "{}")
    except ValueError:
        data = None
    return data if isinstance(data, dict) else {}


def _err(message, status=400):
    return JsonResponse({"ok": False, "error": message}, status=status, json_dumps_params={"ensure_ascii": False})


def _ok(**data):
    return JsonResponse({"ok": True, **data}, json_dumps_params={"ensure_ascii": False})


@login_required
@require_http_methods(["GET", "POST"])
def prefs(request):
    """GET 讀取、POST {hidden_tabs: [...]} 儲存要隱藏的分頁"""
    if request.method == "POST":
        tabs = _body(request).get("hidden_tabs")
        if not isinstance(tabs, list):
            return _err("資料格式錯誤")
        hidden = [t for t in HIDEABLE_TABS if t in tabs]
        UserPrefs.objects.update_or_create(user=request.user, defaults={"hidden_tabs": hidden})
    return _ok(hidden_tabs=UserPrefs.hidden_for(request.user), hideable=list(HIDEABLE_TABS))


def _pl_json(p):
    # 已刪掉的重複歌曲換成保留的那首（同一首不重複出現）
    return {"id": p.id, "name": p.name, "songs": list(dict.fromkeys(resolve_song(s) for s in p.songs))}


def _clean_name(value):
    name = " ".join(str(value or "").split())[:40]
    if not name:
        raise ValueError("請輸入歌單名稱")
    return name


@login_required
@require_http_methods(["GET", "POST"])
def playlists(request):
    """GET 我的歌單；POST {name, songs?} 新增歌單"""
    mine = Playlist.objects.filter(user=request.user)
    if request.method == "POST":
        data = _body(request)
        if mine.count() >= MAX_PLAYLISTS:
            return _err(f"歌單最多 {MAX_PLAYLISTS} 個")
        try:
            name = _clean_name(data.get("name"))
        except ValueError as exc:
            return _err(str(exc))
        if mine.filter(name=name).exists():
            return _err("已經有同名的歌單")
        songs = [s for s in dict.fromkeys(data.get("songs") or []) if isinstance(s, str) and s][:MAX_SONGS]
        p = Playlist.objects.create(user=request.user, name=name, songs=songs)
        return _ok(playlist=_pl_json(p))
    return _ok(playlists=[_pl_json(p) for p in mine])


@login_required
@require_POST
def playlist_update(request, pk):
    """POST {name} 改名、{add: 歌曲編號} 加歌、{remove: 歌曲編號} 移除歌曲"""
    p = get_object_or_404(Playlist, pk=pk, user=request.user)
    data = _body(request)
    if "name" in data:
        try:
            name = _clean_name(data.get("name"))
        except ValueError as exc:
            return _err(str(exc))
        if Playlist.objects.filter(user=request.user, name=name).exclude(pk=p.pk).exists():
            return _err("已經有同名的歌單")
        p.name = name
    add, remove = data.get("add"), data.get("remove")
    if isinstance(add, str) and add and add not in p.songs:
        if len(p.songs) >= MAX_SONGS:
            return _err(f"一個歌單最多 {MAX_SONGS} 首")
        p.songs = p.songs + [add]
    if isinstance(remove, str):
        p.songs = [s for s in p.songs if s != remove]
    p.save()
    return _ok(playlist=_pl_json(p))


@login_required
@require_POST
def playlist_delete(request, pk):
    get_object_or_404(Playlist, pk=pk, user=request.user).delete()
    return _ok()


@login_required
def events_api(request):
    """北部動漫活動（資料來自 Google 試算表，每天 08:30、13:00、20:00 後各更新一次）"""
    events, fresh = get_events(force=request.GET.get("refresh") == "1")
    checked = max((e["checked"] for e in events if e["checked"]), default="")
    return JsonResponse({"events": events, "updated": checked, "fresh": fresh, "fetched_at": fetched_at()},
                        json_dumps_params={"ensure_ascii": False})


@never_cache
def version(request):
    """目前部署的版本，App 切回前景時用來檢查有沒有新版本"""
    return JsonResponse({"version": settings.APP_VERSION, "built": settings.APP_BUILT})


@login_required
def loudness_test(request):
    """音量統一試聽（只在測試站開放）：範例音檔放在影音儲存庫 video/_loudness_test/"""
    if settings.APP_ENV != "staging":
        raise Http404
    return render(request, "player/loudness_test.html")


def wake(request):
    """主機喚醒等待畫面（service worker 會事先存起來，主機休眠時直接顯示）；?preview=1 為預覽模式"""
    return render(request, "player/wake.html")


@cache_control(no_cache=True)
def service_worker(request):
    """service worker 必須從網站根目錄提供，作用範圍才能涵蓋整個網站"""
    # 等待畫面內容的指紋：頁面有改才讓手機重新存一份
    wake_hash = hashlib.md5(render_to_string("player/wake.html", request=request).encode()).hexdigest()[:10]
    js = render(request, "player/sw.js", {"wake_hash": wake_hash}).content
    return HttpResponse(js, content_type="application/javascript")


def manifest(request):
    return JsonResponse({
        "name": "Ukiyo",
        "short_name": "Ukiyo",
        "description": "追番、音樂、活動的個人娛樂基地",
        "start_url": "/",
        "scope": "/",
        "display": "standalone",
        "background_color": "#14122b",
        "theme_color": "#14122b",
        "lang": "zh-Hant",
        "icons": [
            {"src": static("icons/icon-192.png"), "sizes": "192x192", "type": "image/png"},
            {"src": static("icons/icon-512.png"), "sizes": "512x512", "type": "image/png"},
            {"src": static("icons/icon-maskable-512.png"), "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
    }, content_type="application/manifest+json", json_dumps_params={"ensure_ascii": False})
