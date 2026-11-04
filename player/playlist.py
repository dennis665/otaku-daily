"""
從 GitHub 公開儲存庫 (dennis665/fenglan-media-assets) 的 video 資料夾讀取影音清單。
同名的 .mp3 / .mp4 視為同一首歌；結果快取 10 分鐘。

GitHub API 未登入時每個 IP 每小時只能呼叫 60 次，雲端免費主機的對外 IP 由多人共用，
額度常被別人用完，因此：
- 有設定環境變數 GITHUB_TOKEN 時帶上金鑰，額度提高到每小時 5000 次
- 讀取失敗時改用專案內的檔名快照 (player/data/media_files.json)，清單不會變空白
  影音儲存庫新增檔案後，執行 `python manage.py update_media_snapshot` 更新快照
"""
import json
import logging
import os
import time
import urllib.parse
import urllib.request
from pathlib import Path

logger = logging.getLogger(__name__)

REPO = "dennis665/fenglan-media-assets"
FOLDER = "video"
API_URL = f"https://api.github.com/repos/{REPO}/contents/{FOLDER}"
RAW_BASE = f"https://raw.githubusercontent.com/{REPO}/main/{FOLDER}/"
SNAPSHOT_PATH = Path(__file__).resolve().parent / "data" / "media_files.json"
CACHE_SECONDS = 600

_cache = {"data": None, "timestamp": 0.0}


def _raw_url(filename):
    return RAW_BASE + urllib.parse.quote(filename)


def fetch_file_names():
    """向 GitHub API 取得 video 資料夾的檔名清單，失敗時丟出例外"""
    headers = {"User-Agent": "otaku-daily", "Accept": "application/vnd.github+json"}
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(API_URL, headers=headers)
    with urllib.request.urlopen(req, timeout=8) as resp:
        files = json.loads(resp.read().decode("utf-8"))
    return [f["name"] for f in files if f.get("type") == "file"]


def load_snapshot():
    try:
        return json.loads(SNAPSHOT_PATH.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        logger.exception("讀取影音檔名快照失敗")
        return []


def build_playlist(names):
    """把檔名清單整理成 [{id, title, audio, video}]；audio / video 沒有對應檔案時為 None"""
    songs = {}
    for name in names:
        base, dot, ext = name.rpartition(".")
        if not dot or ext.lower() not in ("mp3", "mp4"):
            continue
        song = songs.setdefault(base, {"id": base, "title": base, "audio": None, "video": None})
        if ext.lower() == "mp3":
            song["audio"] = _raw_url(name)
        else:
            song["video"] = _raw_url(name)
    return sorted(songs.values(), key=lambda s: s["title"])


def get_playlist():
    now = time.time()
    if _cache["data"] is not None and now - _cache["timestamp"] < CACHE_SECONDS:
        return _cache["data"]

    try:
        playlist = build_playlist(fetch_file_names())
    except Exception as exc:
        # 有舊快取就沿用，否則改用專案內的快照；同樣快取 10 分鐘後再重試 GitHub
        logger.warning("讀取 GitHub 影音清單失敗，改用備援清單：%s", exc)
        playlist = _cache["data"] or build_playlist(load_snapshot())

    _cache["data"] = playlist
    _cache["timestamp"] = now
    return playlist
