"""
從 GitHub 公開儲存庫 (dennis665/fenglan-media-assets) 的 video 資料夾讀取影音清單。
同名的 .mp3 / .mp4 視為同一首歌；結果快取 10 分鐘，避免超過 GitHub API 每小時 60 次的限制。
"""
import json
import logging
import time
import urllib.parse
import urllib.request

logger = logging.getLogger(__name__)

REPO = "dennis665/fenglan-media-assets"
FOLDER = "video"
API_URL = f"https://api.github.com/repos/{REPO}/contents/{FOLDER}"
RAW_BASE = f"https://raw.githubusercontent.com/{REPO}/main/{FOLDER}/"
CACHE_SECONDS = 600

_cache = {"data": None, "timestamp": 0.0}


def _raw_url(filename):
    return RAW_BASE + urllib.parse.quote(filename)


def get_playlist():
    """回傳 [{id, title, audio, video}]；audio / video 沒有對應檔案時為 None"""
    now = time.time()
    if _cache["data"] is not None and now - _cache["timestamp"] < CACHE_SECONDS:
        return _cache["data"]

    try:
        req = urllib.request.Request(API_URL, headers={"User-Agent": "otaku-daily", "Accept": "application/vnd.github+json"})
        with urllib.request.urlopen(req, timeout=8) as resp:
            files = json.loads(resp.read().decode("utf-8"))
    except Exception:
        logger.exception("讀取 GitHub 影音清單失敗")
        # 讀取失敗時沿用舊快取，沒有舊資料就回傳空清單
        return _cache["data"] or []

    songs = {}
    for f in files:
        name = f.get("name", "")
        base, dot, ext = name.rpartition(".")
        if not dot or ext.lower() not in ("mp3", "mp4"):
            continue
        song = songs.setdefault(base, {"id": base, "title": base, "audio": None, "video": None})
        if ext.lower() == "mp3":
            song["audio"] = _raw_url(name)
        else:
            song["video"] = _raw_url(name)

    playlist = sorted(songs.values(), key=lambda s: s["title"])
    _cache["data"] = playlist
    _cache["timestamp"] = now
    return playlist
