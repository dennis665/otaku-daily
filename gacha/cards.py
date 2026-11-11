"""
卡面圖片與卡片清單：讀 GitHub 影音庫的 cards/index.json，同步成資料庫裡的卡片（Card）
- 圖片：https://raw.githubusercontent.com/dennis665/fenglan-media-assets/main/cards/<file>
- index.json：{"works": {"<youranimes 作品編號>": [{"file": "123/SSR_ab12cd34.webp", "rarity": "SSR", "name": "卡名"}]}}
- 每 10 分鐘最多讀一次；索引裡不見的卡改成抽不到（已經抽到的人卡冊照樣保留）
- 新增卡面：在影音庫用 card_import.py 匯入並推送，App 約 10 分鐘內自動出現
"""
import json
import logging
import time
import urllib.request

from django.db import transaction

from dramas.models import Work

from .models import RARITIES, Card

logger = logging.getLogger(__name__)

RAW = "https://raw.githubusercontent.com/dennis665/fenglan-media-assets/main/cards/"
SYNC_SECONDS = 600
_state = {"at": 0.0}


def image_url(card):
    return RAW + card.file if card.file else ""


def fetch_index():
    req = urllib.request.Request(RAW + "index.json", headers={"User-Agent": "otaku-daily", "Cache-Control": "no-cache"})
    with urllib.request.urlopen(req, timeout=8) as r:
        return json.loads(r.read().decode("utf-8"))


def apply_index(index):
    """把索引同步成 Card：新的建立、改過的更新、不見的設成抽不到；回傳 (新增, 停用) 數"""
    entries = []
    for sid, cards in (index.get("works") or {}).items():
        for c in cards or []:
            if c.get("file") and c.get("rarity") in RARITIES:
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
            card = existing.get(c["file"])
            if card is None:
                Card.objects.create(work_id=wid, rarity=c["rarity"], file=c["file"], name=(c.get("name") or "")[:100])
                created += 1
            elif (card.work_id, card.rarity, card.name, card.active) != (wid, c["rarity"], (c.get("name") or "")[:100], True):
                card.work_id, card.rarity, card.name, card.active = wid, c["rarity"], (c.get("name") or "")[:100], True
                card.save()
        gone = [f for f, card in existing.items() if f not in seen and card.active]
        Card.objects.filter(file__in=gone).update(active=False)
    return created, len(gone)


def sync(force=False):
    """每 10 分鐘最多讀一次 GitHub 索引；失敗就沿用資料庫裡現有的卡片"""
    now = time.time()
    if not force and now - _state["at"] < SYNC_SECONDS:
        return
    _state["at"] = now
    try:
        apply_index(fetch_index())
    except Exception as exc:
        logger.warning("讀取卡片索引失敗，沿用現有卡片：%s", exc)
