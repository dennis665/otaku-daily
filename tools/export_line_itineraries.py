"""
從 csi_server（LINE 行程小幫手）匯出某個 LINE 群組的所有行程（含歷史、已隱藏），給 Ukiyo 的「匯入行程」頁使用。

在「公司主機」上執行（那裡才有正式資料與解密金鑰）：
  1. 把這個檔案複製到 csi_server 專案的根目錄（和 manage.py 同一層）
  2. 用 csi_server 的環境執行：
       Docker：  docker compose exec web python export_line_itineraries.py --group-name 行程助手
       虛擬環境：.venv\\Scripts\\python export_line_itineraries.py --group-name 行程助手
  3. 產生 itineraries_行程助手.json，到 Ukiyo 的「行程 → 匯入」上傳

找不到群組名稱時（例如 Bot 已不在群組），可以改用行程標題關鍵字找群組：
       python export_line_itineraries.py --keyword 超時空輝耀姬
這支程式只讀取資料，不會修改 csi_server 的資料庫。
"""
import argparse
import json
import os
import sys
from collections import Counter

sys.path.insert(0, os.getcwd())
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

import django  # noqa: E402

django.setup()

from django.conf import settings  # noqa: E402
from line_manager.models import Itinerary  # noqa: E402


def group_name(group_id):
    try:
        from linebot.v3.messaging import ApiClient, Configuration, MessagingApi
        with ApiClient(Configuration(access_token=settings.LINE_CHANNEL_ACCESS_TOKEN)) as client:
            return MessagingApi(client).get_group_summary(group_id).group_name
    except Exception:
        return None


def creator_name(it):
    profile = getattr(it.user, "line_profile", None) or getattr(it.user, "lineprofile", None)
    return getattr(profile, "line_display_name", None) or it.user.username


def parse_json(text):
    try:
        value = json.loads(text or "[]")
        return value if isinstance(value, list) else []
    except ValueError:
        return []


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--group-name", default="行程助手")
    parser.add_argument("--keyword", help="改用行程標題關鍵字找出群組")
    args = parser.parse_args()

    counts = Counter(i.group_id for i in Itinerary.objects.exclude(group_id__isnull=True).exclude(group_id=""))
    target = None
    if args.keyword:
        hits = [i.group_id for i in Itinerary.objects.exclude(group_id="") if args.keyword in (i.title or "")]
        target = hits[0] if hits else None
        label = args.keyword
    else:
        print("各群組：")
        for gid, n in counts.most_common():
            name = group_name(gid)
            print(f"  {name or '（讀不到名稱）'}：{n} 筆")
            if name == args.group_name:
                target = gid
        label = args.group_name
    if not target:
        sys.exit(f"找不到「{label}」的群組，可以改用 --keyword 指定一個該群組的行程標題關鍵字")

    rows = []
    for it in Itinerary.objects.filter(group_id=target).select_related("user").order_by("date_time"):
        links = [{"title": l.get("title", ""), "url": l.get("url", "")} for l in parse_json(it.related_links) if isinstance(l, dict)]
        rows.append({
            "title": it.title,
            "activity_type": it.activity_type,
            "date_time": it.date_time.isoformat() if it.date_time else "",
            "location": it.location or "",
            "notes": it.notes or "",
            "links": links,
            "notify_minutes_before": it.notify_minutes_before,
            "interested_users": [str(n) for n in parse_json(it.interested_users)],
            "creator": creator_name(it),
            "is_hidden": it.is_hidden,
            "created_at": it.created_at.isoformat(),
        })

    out = {"source": "csi_server", "group_name": args.group_name if not args.keyword else (group_name(target) or args.group_name),
           "itineraries": rows}
    path = f"itineraries_{out['group_name']}.json"
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print(f"已匯出 {len(rows)} 筆行程 → {os.path.abspath(path)}")


if __name__ == "__main__":
    main()
