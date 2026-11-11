"""
卡面圖片與卡片清單（卡面放在「不公開」的 GitHub 儲存庫，只有登入的人透過本站看得到）
- 儲存庫：環境變數 CARD_REPO（預設 dennis665/fenglan-card-images），讀取用的金鑰 CARD_REPO_TOKEN
  （GitHub fine-grained token，只給這個儲存庫 Contents 讀取權限；在 Render 測試站與正式站都要設定）
- 本機開發可以設定 CARD_LOCAL_DIR 指到卡面庫的本機資料夾，不用金鑰
- 圖片網址：/gacha/img/<file>（本站代為讀取，需要登入）；索引：index.json
  {"works": {"<youranimes 作品編號>": [{"file": "123/SSR_ab12cd34.webp", "rarity": "SSR", "name": "卡名"}]}}
- 每 10 分鐘最多讀一次索引；索引裡不見的卡改成抽不到（已經抽到的人卡冊照樣保留）
- 新增卡面：在卡面庫用 card_import.py 匯入並推送，App 約 10 分鐘內自動出現
"""
import json
import logging
import os
import re
import time
import urllib.request
from collections import OrderedDict
from pathlib import Path

from django.db import transaction

from dramas.models import Work

from .models import RARITIES, Card

logger = logging.getLogger(__name__)

SYNC_SECONDS = 600
_state = {"at": 0.0, "card_backs": {}}
SAFE_FILE = re.compile(r"^(?:\d+/[A-Z]{1,3}_[0-9a-f]{6,40}|card_backs/card_back_\d+)\.webp$")


def _repo():
    return os.environ.get("CARD_REPO", "dennis665/fenglan-card-images")


def read_file(path):
    """從卡面庫讀一個檔案（bytes）；失敗丟出例外"""
    local = os.environ.get("CARD_LOCAL_DIR")
    if local:
        return (Path(local) / path).read_bytes()
    headers = {"User-Agent": "otaku-daily"}
    token = os.environ.get("CARD_REPO_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(f"https://raw.githubusercontent.com/{_repo()}/main/{path}", headers=headers)
    with urllib.request.urlopen(req, timeout=10) as r:
        return r.read()


# 最近讀過的卡面放在記憶體（約 300 張、20MB 以內），同一張不用每次都向 GitHub 要
_images = OrderedDict()
MAX_IMAGES = 300


def image_bytes(file):
    if not SAFE_FILE.match(file or ""):
        raise FileNotFoundError(file)
    if file in _images:
        _images.move_to_end(file)
        return _images[file]
    data = read_file(file)
    _images[file] = data
    while len(_images) > MAX_IMAGES:
        _images.popitem(last=False)
    return data


def image_url(card):
    return f"/gacha/img/{card.file}" if card.file else ""


def _ensure_card_backs():
    if not _state.get("card_backs"):
        try:
            idx = fetch_index()
            _state["card_backs"] = {
                str(sid): path for sid, path in (idx.get("card_backs") or {}).items()
                if SAFE_FILE.match(path)
            }
        except Exception:
            pass


def card_back_url(work):
    """回傳作品（或所屬系列）的專屬卡背圖網址（/gacha/img/card_backs/card_back_xxx.webp）"""
    if work is None:
        return ""
    _ensure_card_backs()
    backs = _state.get("card_backs") or {}
    sid = str(getattr(work, "source_id", work))
    if sid in backs:
        return f"/gacha/img/{backs[sid]}"
    franchise_id = getattr(work, "franchise_id", None)
    if franchise_id:
        from dramas.models import Work
        sids = Work.objects.filter(franchise_id=franchise_id).values_list("source_id", flat=True)
        for s in sids:
            if str(s) in backs:
                return f"/gacha/img/{backs[str(s)]}"
    return ""


def fetch_index():
    return json.loads(read_file("index.json").decode("utf-8"))


def apply_index(index):
    """把索引同步成 Card：新的建立、改過的更新、不見的設成抽不到；回傳 (新增, 停用) 數"""
    entries = []
    for sid, cards in (index.get("works") or {}).items():
        for c in cards or []:
            if c.get("file") and c.get("rarity") in RARITIES and SAFE_FILE.match(c["file"]):
                entries.append((int(sid), c))
    works = dict(Work.objects.filter(source_id__in={sid for sid, _ in entries}).values_list("source_id", "id"))
    existing = {c.file: c for c in Card.objects.exclude(file="")}
    seen, created = set(), 0
    with transaction.atomic():
        for sid, c in entries:
            wid = works.get(sid)
            if not wid:
                continue   # 追劇庫還沒有這部作品
            seen.add(c["file"])
            name = (c.get("name") or "")[:100]
            card = existing.get(c["file"])
            if card is None:
                Card.objects.create(work_id=wid, rarity=c["rarity"], file=c["file"], name=name)
                created += 1
            elif (card.work_id, card.rarity, card.name, card.active) != (wid, c["rarity"], name, True):
                card.work_id, card.rarity, card.name, card.active = wid, c["rarity"], name, True
                card.save()
        gone = [f for f, card in existing.items() if f not in seen and card.active]
        Card.objects.filter(file__in=gone).update(active=False)
    _state["card_backs"] = {
        str(sid): path for sid, path in (index.get("card_backs") or {}).items()
        if SAFE_FILE.match(path)
    }
    return created, len(gone)


def sync(force=False):
    """每 10 分鐘最多讀一次卡面庫索引；失敗就沿用資料庫裡現有的卡片"""
    now = time.time()
    if not force and now - _state["at"] < SYNC_SECONDS:
        return
    _state["at"] = now
    try:
        apply_index(fetch_index())
    except Exception as exc:
        logger.warning("讀取卡片索引失敗，沿用現有卡片：%s", exc)
