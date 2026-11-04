from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.templatetags.static import static
from django.views.decorators.cache import cache_control

from .events import get_events
from .playlist import get_playlist


@login_required
def home(request):
    playlist = get_playlist()
    return render(request, "player/home.html", {
        "playlist": playlist,
        "audio_count": sum(1 for s in playlist if s["audio"]),
        "video_count": sum(1 for s in playlist if s["video"]),
    })


@login_required
def events_api(request):
    """北部動漫活動（資料來自 Google 試算表，每天 08:30 後更新一次）"""
    events, fresh = get_events()
    checked = max((e["checked"] for e in events if e["checked"]), default="")
    return JsonResponse({"events": events, "updated": checked, "fresh": fresh}, json_dumps_params={"ensure_ascii": False})


@cache_control(no_cache=True)
def service_worker(request):
    """service worker 必須從網站根目錄提供，作用範圍才能涵蓋整個網站"""
    js = render(request, "player/sw.js").content
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
