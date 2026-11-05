"""
更新劇庫：搬家（舊劇庫整批匯入）與每日抓新番共用。

規則：
- 以 youranimes 作品編號（source_id）判斷是不是同一部作品 —— 名稱怎麼變都不會變成新的一筆
- 新編號 → 新增；已有 → 更新名稱（優先中文，舊名稱留在 alt_titles）、補上新的播出紀錄
- 永遠不刪除：這次沒出現在清單的作品照樣保留（使用者的追劇清單不會因為抓取而消失）
- 封面：只有原本沒有封面時才補上（或搬家時直接採用）
"""
import re
from datetime import date

from django.db import transaction

from .models import Airing, Franchise, Work, looks_chinese, media_from_title, normalize, parse_label

SEASON_MARK = re.compile(r"\s*(第[一二三四五六七八九十\d]+[季期部章]|Season\s*\d+|\d+(st|nd|rd|th)\s*Season|[ⅡⅢⅣ]|II+|\s\d+)\s*$", re.I)


def choose_title(current, incoming):
    """名稱要不要換：新名稱是中文、舊的不是 → 換；兩個都是中文 → 用新的（譯名更新）；否則維持"""
    if not current:
        return incoming
    if not incoming or incoming == current:
        return current
    if looks_chinese(incoming) and not looks_chinese(current):
        return incoming
    if looks_chinese(incoming) and looks_chinese(current):
        # 舊爬蟲會截掉開頭數字：新名稱只是舊名稱的尾巴時不換
        return current if current.endswith(incoming) else incoming
    return current


def guess_franchise(title, cache):
    """新作品自動歸系列：系列名稱（正規化後）是作品名稱的開頭，取最長的；找不到就用去掉季數的名稱建立"""
    key = normalize(title)
    best = None
    for name_key, fr in cache.items():
        if len(name_key) >= 2 and key.startswith(name_key) and (best is None or len(name_key) > len(best[0])):
            best = (name_key, fr)
    if best:
        return best[1]
    base = SEASON_MARK.sub("", re.sub(r"^(劇場版|電影版|映画)\s*", "", title)).strip() or title
    fr, _ = Franchise.objects.get_or_create(name=base[:150])
    cache[normalize(fr.name)] = fr
    return fr


def upsert_works(items, mode="crawl"):
    """
    items: [{source_id, title, airings:[分類名稱], media_type?, alt_titles?, franchise?, images?, mp3_links?, mp4_links?}]
    mode: "migrate" 搬家（採用檔案裡的全部欄位）／"crawl" 每日抓取（依規則更新）
    回傳統計 dict
    """
    stats = {"created": 0, "updated": 0, "airings_added": 0, "need_images": []}
    ids = [int(i["source_id"]) for i in items if i.get("source_id")]
    existing = {w.source_id: w for w in Work.objects.filter(source_id__in=ids).select_related("franchise")}
    fr_cache = {normalize(f.name): f for f in Franchise.objects.all()}
    have_airings = {}
    for wid, label in Airing.objects.filter(work__source_id__in=ids).values_list("work__source_id", "label"):
        have_airings.setdefault(wid, set()).add(label)

    with transaction.atomic():
        for item in items:
            sid = int(item["source_id"])
            title = (item.get("title") or "").strip()[:255]
            if not title:
                continue
            labels = [l for l in item.get("airings", []) if l]
            w = existing.get(sid)
            created = w is None
            if created:
                w = Work(source_id=sid, title=title, first_seen=None if mode == "migrate" else date.today())
            changed = created

            if mode == "migrate":
                w.title = title
                # 舊爬蟲截掉開頭數字留下的殘缺別名（只是正式名稱的尾巴）不保留
                w.alt_titles = [a for a in dict.fromkeys(item.get("alt_titles") or []) if a != title and not title.endswith(a)]
                w.media_type = item.get("media_type") or media_from_title(title)
                if item.get("franchise"):
                    w.franchise = fr_cache.get(normalize(item["franchise"])) or Franchise.objects.get_or_create(name=item["franchise"][:150])[0]
                    fr_cache[normalize(w.franchise.name)] = w.franchise
                w.images = item.get("images") or []
                w.mp3_links = item.get("mp3_links") or []
                w.mp4_links = item.get("mp4_links") or []
                changed = True
            else:
                new_title = choose_title(w.title if not created else "", title)
                if new_title != w.title:
                    if w.title and w.title not in w.alt_titles:
                        w.alt_titles = [*w.alt_titles, w.title]
                    w.title = new_title
                    changed = True
                if title != w.title and title not in w.alt_titles and not w.title.endswith(title):
                    w.alt_titles = [*w.alt_titles, title]
                    changed = True
                if created:
                    default = item.get("media_type") or "TV"
                    w.media_type = media_from_title(title, default)
                    w.franchise = guess_franchise(title, fr_cache)
                if item.get("images") and not w.images:
                    w.images = item["images"]
                    changed = True

            # 排序用：有實際播出／上映紀錄就取最新的那筆；只有「動畫化決定／製作決定」的才排在最前面（999999）
            all_labels = set(have_airings.get(sid, set())) | set(labels)
            dated = [k for k in (_label_sort_key(l) for l in all_labels) if k != "999999"]
            key = max(dated) if dated else ("999999" if all_labels else "")
            if key != w.sort_key:
                w.sort_key = key
                changed = True
            if changed:
                w.refresh_search()
                w.save()
                stats["created" if created else "updated"] += 1
            existing[sid] = w

            old = have_airings.get(sid, set())
            new_rows = []
            for label in labels:
                if label in old:
                    continue
                kind, year, month = parse_label(label)
                new_rows.append(Airing(work=w, kind=kind, label=label[:50], year=year, month=month))
                old.add(label)
            have_airings[sid] = old
            if new_rows:
                Airing.objects.bulk_create(new_rows, ignore_conflicts=True)
                stats["airings_added"] += len(new_rows)
            if not w.images:
                stats["need_images"].append(sid)
    return stats


def _label_sort_key(label):
    kind, year, month = parse_label(label)
    if kind in (Airing.Kind.ANNOUNCED, Airing.Kind.MOVIE_ANNOUNCED) or not year:
        return "999999"
    return f"{year:04d}{(month or 0):02d}"


def set_images(images_by_id):
    """每日抓取第二步：補上新作品的封面 {source_id: [網址, ...]}（只補原本沒有的）"""
    n = 0
    for sid, urls in images_by_id.items():
        urls = [u for u in urls if str(u).startswith("https://")][:8]
        if urls:
            n += Work.objects.filter(source_id=int(sid), images=[]).update(images=urls)
    return n
