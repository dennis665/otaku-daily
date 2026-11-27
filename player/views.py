import hashlib
import json
import re
from pathlib import Path

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.template.loader import render_to_string
from django.templatetags.static import static
from django.utils import timezone
from django.views.decorators.cache import cache_control, never_cache
from django.views.decorators.http import require_GET, require_http_methods, require_POST

from accounts.names import display_name
from notifications.reminders import SCHEDULE_HINT

from .events import fetched_at, get_events
from .models import HIDEABLE_TABS, SONG_KINDS, Playlist, SongMissSkip, SongRequest, UserPrefs
from .playlist import alias_map, get_playlist, resolve_song
from .songmeta import annotate
from .works import WORKS


@login_required
def home(request):
    playlist = annotate(get_playlist())   # 補上作品、季度、類別（顯示名稱）與搜尋標籤
    return render(request, "player/home.html", {
        "playlist": playlist,
        "audio_count": sum(1 for s in playlist if s["audio"]),
        "video_count": sum(1 for s in playlist if s["video"]),
        "reminder_hint": SCHEDULE_HINT,
        "hidden_tabs": UserPrefs.hidden_for(request.user),
        "song_aliases": alias_map(),
        "song_owner": is_song_owner(request.user),
        "works": WORKS,
    })


# ---------- 📖 功能介紹（第一次使用的人看）：截圖與影片放在不公開的卡面庫 guide/，登入才看得到 ----------
GUIDE_VERSION = 3   # 介紹頁的截圖或影片重新錄製時加 1，讓手機重新下載
_GUIDE_FILE = re.compile(r"^[a-z0-9-]+\.(webp|mp4)$")
_guide_cache = {}


@login_required
def city3d(request):
    """🏙️ 3D 城市《夕陽山城》：three.js 即時產生的城市（原始專案是 dennis/city_3D，打包到 static/city3d/）"""
    return render(request, "player/city3d.html")


@login_required
def guide(request):
    return render(request, "player/guide.html", {"v": GUIDE_VERSION})


@login_required
def guide_media(request, name):
    """介紹頁的截圖與影片；影片支援分段讀取（iPhone 播放影片一定要）"""
    if not _GUIDE_FILE.match(name):
        raise Http404
    from gacha import cards
    if name not in _guide_cache:
        try:
            _guide_cache[name] = cards.read_file(f"guide/{name}")
        except Exception:
            raise Http404
    data = _guide_cache[name]
    ctype = "video/mp4" if name.endswith(".mp4") else "image/webp"
    size = len(data)
    m = re.match(r"bytes=(\d*)-(\d*)$", request.headers.get("Range", ""))
    if m and ctype == "video/mp4" and (m.group(1) or m.group(2)):
        if m.group(1):
            start = int(m.group(1))
            end = min(int(m.group(2)) if m.group(2) else size - 1, size - 1)
        else:   # bytes=-N：最後 N 個位元組
            start, end = max(0, size - int(m.group(2))), size - 1
        if start > end:
            res = HttpResponse(status=416)
            res["Content-Range"] = f"bytes */{size}"
            return res
        res = HttpResponse(data[start:end + 1], status=206, content_type=ctype)
        res["Content-Range"] = f"bytes {start}-{end}/{size}"
    else:
        res = HttpResponse(data, content_type=ctype)
    res["Accept-Ranges"] = "bytes"
    res["Cache-Control"] = "private, max-age=604800"
    return res


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
    return {"id": p.id, "kind": p.kind, "name": p.name, "songs": list(dict.fromkeys(resolve_song(s) for s in p.songs))}


def _clean_songs(value):
    return [s for s in dict.fromkeys(value if isinstance(value, list) else []) if isinstance(s, str) and s][:MAX_SONGS]


def _clean_name(value):
    name = " ".join(str(value or "").split())[:40]
    if not name:
        raise ValueError("請輸入歌單名稱")
    return name


@login_required
@require_http_methods(["GET", "POST"])
def playlists(request):
    """GET 我的歌單（音樂與影片）；POST {name, kind?, songs?} 新增歌單（kind 預設 audio）"""
    mine = Playlist.objects.filter(user=request.user)
    if request.method == "POST":
        data = _body(request)
        kind = data.get("kind") or "audio"
        if kind not in Playlist.KINDS:
            return _err("歌單類型錯誤")
        mine = mine.filter(kind=kind)   # 音樂歌單與影片歌單各自計算數量、名稱可以相同
        if mine.count() >= MAX_PLAYLISTS:
            return _err(f"歌單最多 {MAX_PLAYLISTS} 個")
        try:
            name = _clean_name(data.get("name"))
        except ValueError as exc:
            return _err(str(exc))
        if mine.filter(name=name).exists():
            return _err("已經有同名的歌單")
        p = Playlist.objects.create(user=request.user, kind=kind, name=name, songs=_clean_songs(data.get("songs")))
        return _ok(playlist=_pl_json(p))
    return _ok(playlists=[_pl_json(p) for p in mine])


@login_required
@require_POST
def playlist_update(request, pk):
    """POST {name} 改名、{add: 歌曲編號} 加歌、{remove: 歌曲編號} 移除歌曲、{songs: [...]} 整份換掉（從音樂歌單重新複製）"""
    p = get_object_or_404(Playlist, pk=pk, user=request.user)
    data = _body(request)
    if "name" in data:
        try:
            name = _clean_name(data.get("name"))
        except ValueError as exc:
            return _err(str(exc))
        if Playlist.objects.filter(user=request.user, kind=p.kind, name=name).exclude(pk=p.pk).exists():
            return _err("已經有同名的歌單")
        p.name = name
    if "songs" in data:
        p.songs = _clean_songs(data.get("songs"))
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
        "orientation": "portrait",   # 加入主畫面的 App 固定直式（Android 支援；iPhone 不支援，靠 CSS 避免橫放變形）
        "background_color": "#14122b",
        "theme_color": "#14122b",
        "lang": "zh-Hant",
        "icons": [
            {"src": static("icons/icon-192.png"), "sizes": "192x192", "type": "image/png"},
            {"src": static("icons/icon-512.png"), "sizes": "512x512", "type": "image/png"},
            {"src": static("icons/icon-maskable-512.png"), "sizes": "512x512", "type": "image/png", "purpose": "maskable"},
        ],
    }, content_type="application/manifest+json", json_dumps_params={"ensure_ascii": False})


# ---------- 🙋 歌曲投稿 ----------
_YT = re.compile(r"^https?://(www\.|m\.|music\.)?(youtube\.com/(watch\?|shorts/|live/)|youtu\.be/)[\w\-?=&%./]+$")
MAX_PENDING = 30
MAX_VIDEO_SEC = 600   # 投稿影片最長 10 分鐘（單首歌；避免整集、合輯、一小時循環）


def youtube_seconds(url):
    """讀 YouTube 影片長度（秒）；影片不存在或私人回傳 -1；讀不到（例如被擋）回傳 0（前端已用嵌入播放器檢查過，這裡是補檢查）"""
    m = re.search(r"(?:youtu\.be/|[?&]v=|/shorts/|/live/)([\w-]{11})", url)
    if not m:
        return 0
    import urllib.request
    try:
        req = urllib.request.Request(f"https://www.youtube.com/watch?v={m.group(1)}&hl=zh-TW",
                                     headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "zh-TW,zh;q=0.9"})
        html = urllib.request.urlopen(req, timeout=6).read(1_500_000).decode("utf-8", "ignore")
    except Exception:
        return 0
    status = re.search(r'"playabilityStatus":\{"status":"(\w+)"', html)
    if status and status.group(1) in ("ERROR", "LOGIN_REQUIRED"):
        return -1
    hit = re.search(r'"lengthSeconds":"(\d+)"', html)
    return int(hit.group(1)) if hit else 0


def _req_status():
    """處理結果記在 player/data/song_meta.json 的 requests：{投稿編號: {"status": "done"/"skip", "song": 歌名, "note": 說明}}"""
    from .songmeta import _meta
    return {str(k): v for k, v in (_meta().get("requests") or {}).items() if isinstance(v, dict)}


def _req_json(r, status, me):
    st = status.get(str(r.id)) or {}
    return {"id": r.id, "work_id": r.work_id, "source_id": r.work.source_id if r.work else None, "work": r.work.title if r.work else "", "title": r.title, "kind": r.kind, "tags": r.tags,
            "url": r.url, "audio": r.audio, "video": r.video, "note": r.note, "sec": r.sec, "user": display_name(r.user), "mine": r.user_id == me.id,
            "created": timezone.localtime(r.created_at).strftime("%Y/%m/%d %H:%M"),
            "status": st.get("status") or "pending", "song": st.get("song", ""), "result": st.get("note", "")}


@login_required
@require_http_methods(["GET", "POST"])
def song_requests(request):
    """GET：投稿清單（scope=all 列出所有人的，給管理者讀取處理）；POST：新增投稿"""
    status = _req_status()
    if request.method == "GET":
        qs = SongRequest.objects.select_related("work", "user")
        if request.GET.get("scope") != "all":
            qs = qs.filter(user=request.user)
        if request.GET.get("pending"):
            qs = qs.exclude(id__in=[int(k) for k in status if k.isdigit()])
        return _ok(items=[_req_json(r, status, request.user) for r in qs[:300]], kinds=list(SONG_KINDS))
    data = _body(request)
    url = (data.get("url") or "").strip()
    kind = (data.get("kind") or "").strip()
    tags = (data.get("tags") or "").strip()[:100]
    title = (data.get("title") or "").strip()[:150]
    work = None
    if data.get("work_id"):
        from dramas.models import Work
        work = Work.objects.filter(pk=data.get("work_id")).first()
        if not work:
            return _err("找不到這部作品，請重新選擇")
    if not work and not title:
        return _err("請從追劇清單選一部作品，或自己輸入名稱")
    if kind not in SONG_KINDS:
        return _err("請選擇歌曲類型")
    if kind == "其他" and not tags:
        return _err("類型選「其他」時，請在標籤寫是什麼歌（例如：角色歌、Live 版）")
    if not _YT.match(url):
        return _err("請貼上 YouTube 影片連結（youtube.com/watch?v=… 或 youtu.be/…）")
    if not (data.get("audio") or data.get("video")):
        return _err("音樂和影片至少要勾一個")
    try:
        sec = max(0, int(data.get("sec") or 0))
    except (TypeError, ValueError):
        sec = 0
    if not sec:
        sec = youtube_seconds(url)
        if sec < 0:
            return _err("這部影片不存在或是私人影片，請換一個連結")
    if sec > MAX_VIDEO_SEC:
        return _err(f"影片長度 {sec // 60} 分 {sec % 60} 秒，超過 10 分鐘，請找單首歌的影片")
    pending = SongRequest.objects.filter(user=request.user).exclude(id__in=[int(k) for k in status if k.isdigit()])
    if pending.count() >= MAX_PENDING:
        return _err(f"你還有 {MAX_PENDING} 首投稿等待處理，處理完再投稿")
    if pending.filter(url=url).exists():
        return _err("這個連結你已經投稿過了，等待處理中")
    r = SongRequest.objects.create(user=request.user, work=work, title="" if work else title, kind=kind, tags=tags, url=url,
                                   audio=bool(data.get("audio")), video=bool(data.get("video")), note=(data.get("note") or "").strip()[:200],
                                   sec=sec)
    return _ok(item=_req_json(r, status, request.user))


@login_required
@require_POST
def song_request_delete(request, pk):
    """收回自己還沒處理的投稿"""
    r = get_object_or_404(SongRequest, pk=pk, user=request.user)
    if str(r.id) in _req_status():
        return _err("已經處理過的投稿不能刪除")
    r.delete()
    return _ok()


_cand_cache = {"data": None}


def _candidates():
    """「我的追劇缺歌」的 YouTube 候選（player/data/song_candidates.json，依作品 source_id）"""
    if _cand_cache["data"] is None:
        try:
            path = Path(__file__).resolve().parent / "data" / "song_candidates.json"
            _cand_cache["data"] = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            _cand_cache["data"] = {}
    return _cand_cache["data"]


def is_song_owner(user):
    return user.is_authenticated and user.username == settings.SONG_OWNER


@login_required
@require_GET
def song_request_missing(request):
    """（只開放給 SONG_OWNER）我追的所有作品中，還沒有歌、也還沒投稿的；附 YouTube 候選"""
    if not is_song_owner(request.user):
        raise Http404
    from dramas.models import Follow, Work

    from .songmeta import song_works
    have = {w.id for w in song_works().values()}
    asked = set(SongRequest.objects.exclude(work=None).values_list("work_id", flat=True))
    skipped = set(SongMissSkip.objects.filter(user=request.user).values_list("work_id", flat=True))
    cands = _candidates()
    today = timezone.localdate()
    now_key = today.year * 100 + today.month
    out = []
    ids = Follow.objects.filter(user=request.user).values_list("work_id", flat=True)
    for w in Work.objects.filter(id__in=ids).prefetch_related("airings"):
        if w.mp3_links or w.mp4_links or w.id in have or w.id in asked:
            continue
        keys = []
        for a in w.airings.all():
            if a.year:
                keys.append((a.year * 100 + (a.month or 1), a.label))
        aired = [k for k in keys if k[0] <= now_key and "決定" not in k[1]]
        latest = max(aired) if aired else (max(keys) if keys else (0, "動畫化決定"))
        out.append({"id": w.id, "source_id": w.source_id, "title": w.title, "media": w.get_media_type_display(),
                    "label": latest[1], "key": latest[0], "aired": bool(aired),
                    "jp": next((x for x in (w.alt_titles or []) if re.search(r"[ぁ-ヿ]", x)), ""),
                    "kind": "TV片頭曲" if w.media_type == Work.Media.TV else "完整劇中歌",
                    "skipped": w.id in skipped,   # 按過「已看過不處理」：前端預設不顯示
                    "candidates": cands.get(str(w.source_id)) or []})
    out.sort(key=lambda x: (not x["aired"], -x["key"]))   # 已播出的在前，新的在前
    return _ok(items=out)


@login_required
@require_POST
def song_request_skip(request):
    """（只開放給 SONG_OWNER）「我的追劇缺歌」標記已看過不處理：{work_id, undo?}"""
    if not is_song_owner(request.user):
        raise Http404
    from dramas.models import Work
    data = _body(request)
    work = Work.objects.filter(pk=data.get("work_id")).first()
    if not work:
        return _err("找不到這部作品")
    if data.get("undo"):
        SongMissSkip.objects.filter(user=request.user, work=work).delete()
    else:
        SongMissSkip.objects.get_or_create(user=request.user, work=work)
    return _ok(skipped=not data.get("undo"))
