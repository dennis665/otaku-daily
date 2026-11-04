"""
匯入 LINE 版行程小幫手（csi_server）的行程：檔案由 tools/export_line_itineraries.py 在公司主機上產生。

- 建立（或沿用）同名群組，匯入的人是群組建立者；所有行程的建立者都是匯入的人
- 原本的發起人、有興趣的人是 LINE 暱稱，無法對應到 Ukiyo 帳號，所以寫進備註保留
- 重複匯入時，同一群組裡「標題 + 時間」相同的行程會略過，不會重複
- 已經過去的行程標記為已提醒（不會再推播）；原本隱藏的行程對匯入者同樣隱藏
"""
import json
from datetime import datetime

from django.db import transaction
from django.utils import timezone

from .models import Group, GroupMember, Itinerary

MAX_BYTES = 2 * 1024 * 1024
MAX_ITEMS = 2000


class ImportError_(Exception):
    pass


def _dt(value):
    if not value:
        return None
    try:
        dt = datetime.fromisoformat(value)
    except ValueError:
        return None
    return timezone.make_aware(dt) if timezone.is_naive(dt) else dt


def import_line_export(user, raw_bytes):
    """回傳 (群組, 匯入筆數, 略過筆數)"""
    if len(raw_bytes) > MAX_BYTES:
        raise ImportError_("檔案太大（上限 2 MB）")
    try:
        data = json.loads(raw_bytes.decode("utf-8-sig"))
    except (UnicodeDecodeError, ValueError) as exc:
        raise ImportError_("檔案格式不對，請上傳匯出程式產生的 .json 檔") from exc
    items = data.get("itineraries") if isinstance(data, dict) else None
    if not isinstance(items, list):
        raise ImportError_("檔案裡找不到行程資料")
    if len(items) > MAX_ITEMS:
        raise ImportError_(f"行程太多（上限 {MAX_ITEMS} 筆）")

    name = str(data.get("group_name") or "匯入的群組").strip()[:40]
    valid_types = set(Itinerary.Type.values)
    valid_notify = dict(Itinerary.NOTIFY_CHOICES)
    now = timezone.now()
    imported = skipped = 0

    with transaction.atomic():
        group = Group.objects.filter(name=name, members__user=user).first()
        if group is None:
            group = Group.objects.create(name=name, created_by=user)
            GroupMember.objects.create(group=group, user=user, is_owner=True)
        existing = {(i.title, i.date_time) for i in group.itineraries.all()}

        for row in items:
            if not isinstance(row, dict):
                skipped += 1
                continue
            title = str(row.get("title") or "").strip()[:100]
            if not title:
                skipped += 1
                continue
            when = _dt(row.get("date_time"))
            if (title, when) in existing:
                skipped += 1
                continue
            notes = str(row.get("notes") or "").strip()
            origin = [f"發起人：{row['creator']}"] if row.get("creator") else []
            if row.get("interested_users"):
                origin.append("有興趣：" + "、".join(str(n) for n in row["interested_users"]))
            if origin:
                notes = (notes + "\n\n" if notes else "") + "（從 LINE 版匯入｜" + "；".join(origin) + "）"
            links = [{"title": str(l.get("title") or "")[:60], "url": str(l.get("url"))[:500]}
                     for l in (row.get("links") or []) if isinstance(l, dict) and str(l.get("url") or "").startswith(("http://", "https://"))]
            try:
                notify = int(row.get("notify_minutes_before", 1440))
            except (TypeError, ValueError):
                notify = 1440
            it = Itinerary.objects.create(
                creator=user, group=group, title=title,
                activity_type=row.get("activity_type") if row.get("activity_type") in valid_types else Itinerary.Type.OTHER,
                date_time=when,
                location=str(row.get("location") or "").strip()[:200],
                notes=notes[:2000],
                links=links[:10],
                notify_minutes_before=notify if notify in valid_notify else 1440,
                is_notified=bool(when and when < now),
            )
            it.interested.add(user)
            if row.get("is_hidden"):
                it.hidden_by.add(user)
            existing.add((title, when))
            imported += 1
    return group, imported, skipped
