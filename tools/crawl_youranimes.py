"""
每日抓新番：從 youranimes.tw 抓季番與動畫電影清單，送給 Ukiyo 更新劇庫。
由 GitHub Actions 每天執行（.github/workflows/drama-sync.yml），也可以在本機手動跑：

    python tools/crawl_youranimes.py --dry-run                    # 只抓取、印出統計，不送出
    DRAMA_SYNC_TOKEN=xxx python tools/crawl_youranimes.py --target https://otaku-daily.onrender.com

做法（相對舊版的改進）：
- 讀網頁裡的結構化資料（JSON-LD）：每部作品的中文名稱、作品編號、封面、其他名稱、類型一次拿到，
  不用再一部一部打開作品頁找封面（每天約 20 次請求，舊版是數百次）
- 以作品編號判斷同一部作品；Ukiyo 端「只新增、不刪除」
- 抓取範圍依今天日期自動計算：季番＝上一季～兩年後＋動畫化決定；電影＝去年～兩年後（日版、台版）＋製作決定
- 每頁間隔 1 秒；某頁失敗就略過，超過一半失敗就整次放棄、不送出（避免殘缺資料）
只用 Python 內建模組，不需要安裝套件。
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date

BASE = "https://youranimes.tw"
UA = "UkiyoBot/1.0 (+https://otaku-daily.onrender.com; daily anime list sync)"
DELAY = 1.0


def pages_to_crawl(today=None):
    """回傳 [(網址, 分類名稱, 預設類型)]"""
    today = today or date.today()
    cur = (today.month - 1) // 3 * 3 + 1
    seasons = []
    y, m = today.year, cur - 3
    if m < 1:
        y, m = y - 1, m + 12
    while (y, m) <= (today.year + 2, 10):
        seasons.append((y, m))
        m += 3
        if m > 12:
            y, m = y + 1, m - 12
    pages = [(f"{BASE}/bangumi/unknown", "動畫化決定", "TV")]
    pages += [(f"{BASE}/bangumi/{y}{m:02d}", f"{y}年{m}月新番", "TV") for y, m in seasons]
    pages.append((f"{BASE}/anime-movie-premiered/unknown/jp", "日本動畫電影製作決定", "MOVIE"))
    for y in range(today.year - 1, today.year + 3):
        pages.append((f"{BASE}/anime-movie-premiered/{y}/jp", f"{y}年日版動畫電影", "MOVIE"))
        pages.append((f"{BASE}/anime-movie-premiered/{y}/tw", f"{y}年台版動畫電影", "MOVIE"))
    return pages


def fetch(url, timeout=40, tries=3):
    """回傳頁面內容；404（網站還沒開這一季的頁面）回傳 None"""
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "zh-TW,zh;q=0.9"})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read().decode("utf-8", errors="ignore")
        except urllib.error.HTTPError as exc:
            if exc.code == 404:
                return None
            if i == tries - 1:
                raise
            print(f"    重試 {url}：{exc}")
            time.sleep(5 * (i + 1))
        except Exception as exc:
            if i == tries - 1:
                raise
            print(f"    重試 {url}：{exc}")
            time.sleep(5 * (i + 1))


def parse(html, label, default_media):
    """從頁面的 JSON-LD 取出作品清單；回傳 (作品列表, 頁面宣告的筆數)"""
    items, declared = [], None
    for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', html, re.S):
        try:
            data = json.loads(m.group(1))
        except ValueError:
            continue
        for block in data if isinstance(data, list) else [data]:
            if not isinstance(block, dict) or block.get("@type") != "ItemList":
                continue
            declared = block.get("numberOfItems")
            for el in block.get("itemListElement", []):
                it = el.get("item") or {}
                sid = re.search(r"/animes/(\d+)", it.get("url") or "")
                name = (it.get("name") or "").strip()
                if not sid or not name:
                    continue
                alts = it.get("alternateName") or []
                if isinstance(alts, str):
                    alts = [alts]
                img = it.get("image")
                if isinstance(img, list):
                    img = img[0] if img else None
                items.append({
                    "source_id": int(sid.group(1)),
                    "title": name,
                    "alt_titles": [a.strip() for a in alts if isinstance(a, str) and a.strip()],
                    "media_type": {"Movie": "MOVIE", "TVSeries": "TV"}.get(it.get("@type"), default_media),
                    "images": [img] if isinstance(img, str) and img.startswith("https://") else [],
                    "airings": [label],
                })
    return items, declared


def crawl():
    pages = pages_to_crawl()
    works, errors = {}, []
    for i, (url, label, media) in enumerate(pages):
        if i:
            time.sleep(DELAY)
        try:
            html = fetch(url)
            if html is None:
                print(f"  · {label}：網站尚無這一頁（還沒公布）")
                continue
            items, declared = parse(html, label, media)
        except Exception as exc:
            errors.append(f"{label}：{exc}")
            print(f"  ✗ {label} 讀取失敗：{exc}")
            continue
        if declared and not items:
            errors.append(f"{label}：頁面宣告 {declared} 筆但解析不到")
            print(f"  ✗ {label} 解析失敗")
            continue
        print(f"  ✓ {label}：{len(items)} 部")
        for it in items:
            w = works.get(it["source_id"])
            if w is None:
                works[it["source_id"]] = it
            else:   # 同一部作品出現在多個分類（例如日版、台版都有上映）：合併
                w["airings"] = sorted(set(w["airings"]) | set(it["airings"]))
                w["alt_titles"] = list(dict.fromkeys(w["alt_titles"] + it["alt_titles"]))
                w["images"] = w["images"] or it["images"]
    return list(works.values()), errors, len(pages)


def send(target, token, payload):
    req = urllib.request.Request(
        f"{target.rstrip('/')}/dramas/api/sync/",
        data=json.dumps(payload, ensure_ascii=False).encode(),
        method="POST",
        headers={"Content-Type": "application/json", "X-Sync-Token": token, "User-Agent": UA},
    )
    last = None
    for i in range(4):   # 免費主機休眠時要等它醒來
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.load(r)
        except Exception as exc:
            last = exc
            print(f"  送出到 {target} 失敗（第 {i + 1} 次）：{exc}")
            time.sleep(20)
    raise last


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--target", action="append", default=[], help="Ukiyo 網址，可重複指定多個")
    ap.add_argument("--dry-run", action="store_true", help="只抓取，不送出")
    args = ap.parse_args()

    print(f"抓取 youranimes（{date.today()}）…")
    works, errors, total_pages = crawl()
    print(f"共 {len(works)} 部作品，{total_pages} 頁中失敗 {len(errors)} 頁")
    if len(errors) * 2 > total_pages:
        sys.exit("失敗的頁面超過一半，可能是網站改版或連不上，這次不送出（劇庫維持原樣）")
    if args.dry_run:
        print(json.dumps(works[:3], ensure_ascii=False, indent=1))
        return
    token = os.environ.get("DRAMA_SYNC_TOKEN", "")
    if not token:
        sys.exit("缺少 DRAMA_SYNC_TOKEN")
    failed = False
    for target in args.target:
        try:
            res = send(target, token, {"works": works, "errors": errors, "pages": total_pages})
            print(f"{target}：新增 {res.get('created')}、更新 {res.get('updated')}、新播出紀錄 {res.get('airings_added')}、補封面 {res.get('images_set')}")
        except Exception as exc:
            failed = True
            print(f"{target}：送出失敗 {exc}")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
