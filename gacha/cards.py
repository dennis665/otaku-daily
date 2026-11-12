"""
卡面圖片與卡片清單（卡面放在「不公開」的 GitHub 儲存庫，只有登入的人透過本站看得到）
- 儲存庫：環境變數 CARD_REPO（預設 dennis665/fenglan-card-images），讀取用的金鑰 CARD_REPO_TOKEN
  （GitHub fine-grained token，只給這個儲存庫 Contents 讀取權限；在 Render 測試站與正式站都要設定）
- 本機開發可以設定 CARD_LOCAL_DIR 指到卡面庫的本機資料夾，不用金鑰
- 圖片網址：/gacha/img/<file>（本站代為讀取，需要登入）；索引：index.json
  {"works": {"<youranimes 作品編號>": [{"file": "123/SSR_ab12cd34.webp", "rarity": "SSR", "name": "卡名"}]}}
- 每 10 分鐘最多讀一次索引；索引裡不見的卡改成抽不到（已經抽到的人卡冊照樣保留）
- 新增卡面：在卡面庫用 card_import.py 匯入並推送，App 約 10 分鐘內自動出現
- 新作品第一次有卡片時，所有帳號每部送自選抽卡券（gift_new_works）
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


# 卡面重新產生（同一個檔名、內容改了）時加 1，讓手機裡存的舊圖失效、重新讀取
IMAGE_VERSION = 2


def image_url(card):
    return f"/gacha/img/{card.file}?v={IMAGE_VERSION}" if card.file else ""


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


def refund_removed(cards_qs):
    """卡片下架前：持有這些卡的帳號，每張依稀有度退還分解價值的星塵，並留一則通知"""
    from .models import DUST_VALUE, GachaState, OwnedCard
    gain = {}
    for o in OwnedCard.objects.filter(card__in=cards_qs).select_related("card"):
        gain[o.user_id] = gain.get(o.user_id, 0) + DUST_VALUE.get(o.card.rarity, 1) * o.count
    for uid, dust in gain.items():
        state, _ = GachaState.objects.get_or_create(user_id=uid)
        state.stardust += dust
        state.notice = _add_notice(state.notice, f"有卡片下架了，已退還 ✨ {dust} 星塵給你")
        state.save(update_fields=["stardust", "notice"])
    return gain


def _add_notice(old, msg):
    return ("；".join(x for x in (old, msg) if x))[:200]


def _carded_works():
    """目前抽得到的作品：{作品代號: 名稱}（同系列算同一部）"""
    out = {}
    rows = (Card.objects.filter(active=True).exclude(file="")
            .values_list("work_id", "work__franchise_id", "work__title").distinct())
    for wid, fid, title in rows:
        out.setdefault(f"f{fid}" if fid else f"w{wid}", title)
    return out


def gift_new_works(before):
    """
    有新作品上架（第一次有卡片）時，所有帳號每部送自選抽卡券 NEW_WORK_GIFT 張並通知；同一部只送一次
    before：這次同步前已經抽得到的作品代號
    第一次使用（還沒有任何紀錄）時，把同步前就有的作品記成已送過；資料庫原本完全沒卡片（全新環境）則全部記成已送過、不發
    """
    from django.contrib.auth import get_user_model

    from .models import NEW_WORK_GIFT, GachaState, GiftedWork
    now = _carded_works()
    if not GiftedWork.objects.exists():
        seed = set(now) if not before else set(before)
        GiftedWork.objects.bulk_create([GiftedWork(key=k) for k in seed], ignore_conflicts=True)
    done = set(GiftedWork.objects.values_list("key", flat=True))
    new = {k: t for k, t in now.items() if k not in done}
    if not new:
        return {}
    GiftedWork.objects.bulk_create([GiftedWork(key=k) for k in new], ignore_conflicts=True)
    tickets = NEW_WORK_GIFT * len(new)
    msg = f"🎉 新作品上架：{'、'.join(new.values())}，送你 🎫 自選抽卡券 {tickets} 張"
    for uid in get_user_model().objects.filter(is_active=True).values_list("id", flat=True):
        state, _ = GachaState.objects.get_or_create(user_id=uid)
        state.bonus_tickets += tickets
        state.notice = _add_notice(state.notice, msg)
        state.save(update_fields=["bonus_tickets", "notice"])
    logger.info("新作品上架送券：%s", "、".join(new.values()))
    try:   # 推播通知（有開通知的裝置）
        from notifications.push import send_to_users
        send_to_users(get_user_model().objects.filter(is_active=True), "🎉 新作品上架",
                      f"{'、'.join(new.values())} 的卡片上架了！送你 🎫 自選抽卡券 {tickets} 張", url="/?tab=gacha", tag="gacha-new-work")
    except Exception as exc:
        logger.warning("新作品上架推播失敗：%s", exc)
    return new


def apply_index(index):
    """
    把索引同步成 Card：新的建立、改過的更新（含卡號）、索引裡不見的整張刪除（連同抽卡紀錄與卡冊裡的這張）；回傳 (新增, 刪除) 數
    防呆：索引裡的卡少於目前卡片的一半時（可能讀到壞掉的索引），只停用不刪除
    """
    entries = []
    for sid, cards in (index.get("works") or {}).items():
        for c in cards or []:
            if c.get("file") and c.get("rarity") in RARITIES and SAFE_FILE.match(c["file"]):
                entries.append((int(sid), c))
    works = dict(Work.objects.filter(source_id__in={sid for sid, _ in entries}).values_list("source_id", "id"))
    existing = {c.file: c for c in Card.objects.exclude(file="")}
    seen, created = set(), 0
    with transaction.atomic():
        before = set(_carded_works())
        for sid, c in entries:
            wid = works.get(sid)
            if not wid:
                continue   # 追劇庫還沒有這部作品
            seen.add(c["file"])
            name = (c.get("name") or "")[:100]
            no = int(c.get("no") or 0)
            card = existing.get(c["file"])
            if card is None:
                Card.objects.create(work_id=wid, rarity=c["rarity"], file=c["file"], name=name, no=no)
                created += 1
            elif (card.work_id, card.rarity, card.name, card.no, card.active) != (wid, c["rarity"], name, no, True):
                card.work_id, card.rarity, card.name, card.no, card.active = wid, c["rarity"], name, no, True
                card.save()
        gone = [f for f in existing if f not in seen]
        active_before = sum(1 for card in existing.values() if card.active)
        if len(seen) >= active_before / 2:
            refund_removed(Card.objects.filter(file__in=gone))
            Card.objects.filter(file__in=gone).delete()
            Card.objects.filter(file="").delete()   # 早期沒有圖的舊卡
        else:
            logger.warning("卡片索引只有 %s 張（原本 %s 張），只停用不刪除", len(seen), active_before)
            Card.objects.filter(file__in=gone).update(active=False)
        gift_new_works(before)
    _state["card_backs"] = {
        str(sid): path for sid, path in (index.get("card_backs") or {}).items()
        if SAFE_FILE.match(path)
    }
    _state["combos"] = {str(k): v for k, v in (index.get("combos") or {}).items() if isinstance(v, list)}
    _state["titles"] = {str(k): v for k, v in (index.get("titles") or {}).items() if isinstance(v, dict)}
    return created, len(gone)


def combos():
    """組合羈絆設定（卡面庫 index.json 的 combos）：{作品編號: [{"name": 組合名, "chars": [角色名…]}]}"""
    return _state.get("combos") or {}


def work_titles():
    """收集稱號設定（index.json 的 titles）：{作品編號: {"50": 稱號, "100": 稱號}}"""
    return _state.get("titles") or {}


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
