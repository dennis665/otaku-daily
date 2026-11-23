"""
音樂／影片清單的顯示資料：每首歌對應的動畫作品、系列、播出季度、類別（TV片頭曲、完整ED…）與搜尋標籤。

- 作品對應：追劇庫作品的主題曲連結（Work.mp3_links／mp4_links 指到影音庫的檔名），
  沒對應到的可在 player/data/song_meta.json 的 work 手動指定作品編號
- 類別：歌名有「劇中／主題曲」算劇中歌、有 ED 算片尾曲，其餘當片頭曲（song_meta.json 的 kind 可手動指定）；
  長度超過 105 秒（或歌名有「完整版」）算完整版，否則是 TV 尺寸（約 90 秒）
- song_meta.json 的 label：手動指定顯示的類別文字（投稿選「其他」時的自訂標籤）；custom：不在追劇清單的作品
  {歌名: {"work": 顯示的作品名, "label": 類別, "sub": 小字, "tags": 搜尋用}}；requests：投稿處理結果
- 實際檔名不改（歌單、追劇連結、問答題庫都用檔名當編號），只改畫面上顯示的名稱
"""
import json
import re
import time
import urllib.parse
from difflib import SequenceMatcher
from pathlib import Path

META_PATH = Path(__file__).resolve().parent / "data" / "song_meta.json"
CACHE_SECONDS = 600
FULL_SECONDS = 105
LABELS = {("OP", False): "TV片頭曲", ("OP", True): "完整片頭曲",
          ("ED", False): "TV片尾曲", ("ED", True): "完整ED",
          ("劇中", False): "劇中歌", ("劇中", True): "完整劇中歌"}
KIND_WORDS = {"OP": "OP 片頭 片頭曲 opening", "ED": "ED 片尾 片尾曲 ending", "劇中": "劇中歌 插入曲 主題曲"}
CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩"
_cache = {"at": 0.0, "works": None}


def _meta():
    try:
        return json.loads(META_PATH.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


def _link_name(link):
    return urllib.parse.unquote((link.get("url") or "").rsplit("/", 1)[-1]).rsplit(".", 1)[0]


def _season(work):
    airs = sorted(work.airings.all(), key=lambda a: (a.year or 9999, a.month or 99))
    return airs[0].label if airs else ""


def song_works():
    """{歌曲檔名: Work}；10 分鐘重算一次"""
    if _cache["works"] is not None and time.time() - _cache["at"] < CACHE_SECONDS:
        return _cache["works"]
    from dramas.models import Work
    cands = {}
    qs = Work.objects.exclude(mp3_links=[], mp4_links=[]).select_related("franchise").prefetch_related("airings").order_by("id")
    for field in ("mp3_links", "mp4_links"):   # 音樂連結優先
        for w in qs:
            for link in getattr(w, field) or []:
                cands.setdefault(_link_name(link), {}).setdefault(field, []).append(w)
    found = {}
    for name, by_field in cands.items():
        ws = by_field.get("mp3_links") or by_field.get("mp4_links")
        # 同一首歌被好幾部作品連結（例如同一季分上下篇）：挑名稱最像檔名的那部
        found[name] = max(ws, key=lambda w: SequenceMatcher(None, name, w.title).ratio())
    manual = (_meta().get("work") or {})
    if manual:
        by_sid = {w.source_id: w for w in Work.objects.filter(source_id__in=manual.values())
                  .select_related("franchise").prefetch_related("airings")}
        for name, sid in manual.items():
            if sid in by_sid:
                found[name] = by_sid[sid]
    _cache.update(at=time.time(), works=found)
    return found


def _kind(name, manual):
    if manual.get(name):
        return manual[name]
    if re.search(r"劇中|主題曲", name):
        return "劇中"
    if re.search(r"(^|[\s　])ED([\s　\d]|$)", name):
        return "ED"
    return "OP"


def annotate(playlist):
    """回傳新的清單（不改動快取的原清單），每首多了 name（完整顯示名稱）、work（作品名）、label（類別，例：TV片頭曲 ①）、
    sub（系列・播出季度）、tags（搜尋用文字）；不是動畫歌的只有 name＝原檔名"""
    meta = _meta()
    secs, kinds = meta.get("sec") or {}, meta.get("kind") or {}
    labels, custom = meta.get("label") or {}, meta.get("custom") or {}
    works = song_works()
    rows = []
    for s in playlist:
        w = works.get(s["id"])
        c = custom.get(s["id"])
        if not w and isinstance(c, dict) and c.get("work"):   # 投稿時自己輸入、不在追劇清單的作品
            label = c.get("label") or ""
            rows.append({**s, "name": f"{c['work']} {label}".strip(), "work": c["work"], "label": label, "sub": c.get("sub") or "",
                         "tags": " ".join(x for x in [s["id"], c["work"], label, c.get("sub") or "", c.get("tags") or ""] if x),
                         "_key": ("custom:" + c["work"], label)})
            continue
        if not w:   # 不是動畫歌（歌手 - 歌名、放鬆音樂）：照原名顯示
            rows.append({**s, "name": s["title"], "sub": "", "tags": s["title"]})
            continue
        kind = _kind(s["id"], kinds)
        full = (secs.get(s["id"]) or 0) > FULL_SECONDS or "完整版" in s["id"]
        label = labels.get(s["id"]) or LABELS[(kind, full)]   # 投稿選「其他」時的自訂標籤（例：角色歌）
        season = _season(w)
        series = w.franchise.name if w.franchise else ""
        show_series = len(series) >= 3 and series != w.title   # 劇庫有些系列名稱太短（例：「Re」），不顯示
        sub = "・".join(x for x in [series if show_series else "", season] if x)
        tags = " ".join(x for x in [s["id"], w.title, *(w.alt_titles or []), series, season, label, KIND_WORDS[kind],
                                    "完整版 full" if full else "TV版 tv size"] if x)
        rows.append({**s, "name": f"{w.title} {label}", "work": w.title, "label": label, "sub": sub, "tags": tags, "_key": (w.id, label)})
    # 同一部作品同一類別有好幾首：依原本順序加 ①②③
    count = {}
    for r in rows:
        if "_key" in r:
            count[r["_key"]] = count.get(r["_key"], 0) + 1
    # 編號照檔名結尾的數字（「第四季1」是①、「第四季2」是②），沒有數字的排前面
    groups = {}
    for r in rows:
        key = r.pop("_key", None)
        if key and count[key] > 1:
            groups.setdefault(key, []).append(r)
    for members in groups.values():
        members.sort(key=lambda r: (int(m.group(1)) if (m := re.search(r"(\d+)\s*$", r["id"])) else 0, r["id"]))
        for n, r in enumerate(members, 1):
            no = f" {CIRCLED[n - 1] if n <= len(CIRCLED) else n}"
            r["name"] += no
            r["label"] += no
    return rows
