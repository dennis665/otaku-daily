"""
北部動漫活動：讀取 Google 試算表「每日資訊追蹤：AI 與北部動漫活動」的「北部動漫活動」工作表。
試算表由雲端排程每天更新，這裡只負責讀取與整理。

- 試算表設為「知道連結的人可檢視」，用 CSV 匯出網址讀取，不需要 Google 金鑰
- 試算表的雲端排程在台灣時間每天 08:00 左右執行（約 2 分鐘跑完），所以網站一天只更新一次：
  每天 08:30 之後第一次有人看活動時重新讀取，其他時間都用快取
- 讀取失敗時沿用舊快取（5 分鐘後再重試），再不行就用專案內的備份
  (player/data/events_snapshot.json，執行 `python manage.py update_events_snapshot` 更新)
"""
import csv
import io
import json
import logging
import re
import time
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo

logger = logging.getLogger(__name__)

SHEET_ID = "1kaToO3iPO3tsZF2blWupU98TUtPNBXzwZdRH0PrxH7A"
SHEET_GID = "1"
CSV_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={SHEET_GID}"
SNAPSHOT_PATH = Path(__file__).resolve().parent / "data" / "events_snapshot.json"
TAIPEI = ZoneInfo("Asia/Taipei")
DAILY_REFRESH = (8, 30)   # 台灣時間 08:30：排程 08:00 執行完後再讀
RETRY_SECONDS = 300

# 試算表欄位名稱 → 程式用的欄位
COLUMNS = {
    "類型": "type",
    "活動名稱": "name",
    "作品/IP": "ip",
    "地點": "place",
    "開始日": "start",
    "結束日": "end",
    "摘要": "summary",
    "來源連結": "url",
    "首次收錄": "added",
    "最後確認": "checked",
}
UNVERIFIED = re.compile(r"[（(]\s*未開頁核實\s*[)）]")
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

_cache = {"data": None, "timestamp": 0.0, "retry_at": 0.0}


def fetch_csv():
    req = urllib.request.Request(CSV_URL, headers={"User-Agent": "ukiyo-app"})
    with urllib.request.urlopen(req, timeout=10) as resp:
        return resp.read().decode("utf-8-sig")


def parse_events(text):
    """把 CSV 整理成活動清單；日期格式不對的欄位當作「未提供」"""
    rows = csv.DictReader(io.StringIO(text))
    events = []
    for row in rows:
        item = {key: (row.get(col) or "").strip() for col, key in COLUMNS.items()}
        if not item["name"]:
            continue
        for key in ("start", "end", "added", "checked"):
            if not DATE.match(item[key]):
                item[key] = ""
        # 摘要裡的「（未開頁核實）」改成獨立標記，畫面上顯示成小標籤
        item["unverified"] = bool(UNVERIFIED.search(item["summary"]))
        item["summary"] = UNVERIFIED.sub("", item["summary"]).strip()
        if not item["url"].startswith(("http://", "https://")):
            item["url"] = ""
        events.append(item)
    return events


def load_snapshot():
    try:
        return json.loads(SNAPSHOT_PATH.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        logger.exception("讀取活動備份失敗")
        return []


def last_refresh_point(now=None):
    """最近一次的每日更新時間點（台灣時間 08:30），回傳 Unix 時間"""
    now = now or datetime.now(TAIPEI)
    point = now.replace(hour=DAILY_REFRESH[0], minute=DAILY_REFRESH[1], second=0, microsecond=0)
    if now < point:
        point -= timedelta(days=1)
    return point.timestamp()


def get_events():
    """回傳 (活動清單, 是否為最新資料)"""
    now = time.time()
    fresh_cache = _cache["data"] is not None and _cache["timestamp"] >= last_refresh_point()
    if fresh_cache or now < _cache["retry_at"]:
        return _cache["data"] or load_snapshot(), fresh_cache

    try:
        events = parse_events(fetch_csv())
    except Exception as exc:
        logger.warning("讀取試算表活動失敗，改用備援資料：%s", exc)
        _cache["retry_at"] = now + RETRY_SECONDS
        return _cache["data"] or load_snapshot(), False

    _cache.update(data=events, timestamp=now, retry_at=0.0)
    return events, True
