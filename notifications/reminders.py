"""
行程提醒：由 /notify/tick/ 定時呼叫。

為了節省免費主機（Render 每月 750 小時）與資料庫（Neon）的額度，外部排程只在
台灣時間 08:00～22:00、每 30 分鐘叫醒網站一次（見 .github/workflows/notify-tick.yml）。
所以提醒的時間會有誤差：
- 白天：預定提醒時間前後 15 分鐘內的那次檢查發出
- 晚上：22:00 那次檢查會把到隔天 08:00 之前要發的提醒全部提早發出，避免半夜的提醒漏掉
"""
import logging
from datetime import timedelta

from django.utils import timezone

from planner.models import Itinerary

from .push import send_to_users

logger = logging.getLogger(__name__)

ACTIVE_START_HOUR = 8     # 每天第一次檢查（台灣時間）
ACTIVE_END_HOUR = 22      # 每天最後一次檢查
INTERVAL = timedelta(minutes=30)
GRACE = timedelta(minutes=35)   # 行程開始後 35 分鐘內還沒提醒的仍補發，再晚就不發了
MAX_AHEAD = timedelta(minutes=max(m for m, _ in Itinerary.NOTIFY_CHOICES))
WEEK = "一二三四五六日"

# 給畫面顯示的說明文字
SCHEDULE_HINT = (f"提醒在 {ACTIVE_START_HOUR:02d}:00～{ACTIVE_END_HOUR:02d}:00 每 30 分鐘檢查一次，"
                 f"可能提早或延後約 15 分鐘；{ACTIVE_END_HOUR:02d}:00 之後到隔天 {ACTIVE_START_HOUR:02d}:00 的提醒會在 "
                 f"{ACTIVE_END_HOUR:02d}:00 先發出")


def send_until(now):
    """這次檢查要發「預定提醒時間 ≤ 回傳值」的提醒"""
    local = timezone.localtime(now)
    last_check = local.replace(hour=ACTIVE_END_HOUR, minute=0, second=0, microsecond=0)
    if local >= last_check - INTERVAL / 2 or local.hour < ACTIVE_START_HOUR:
        # 當天最後一次（或夜間被叫醒）：發到下一個早上第一次檢查為止
        next_morning = local.replace(hour=ACTIVE_START_HOUR, minute=0, second=0, microsecond=0)
        if local.hour >= ACTIVE_START_HOUR:
            next_morning += timedelta(days=1)
        return next_morning
    return now + INTERVAL / 2


def _when(dt, now):
    local = timezone.localtime(dt)
    text = f"{local.month}/{local.day}（{WEEK[local.weekday()]}）{local:%H:%M}"
    minutes = int((dt - now).total_seconds() // 60)
    if minutes <= 0:
        return f"{text} 已經開始"
    if minutes < 60:
        return f"{text}，再 {minutes} 分鐘開始"
    if minutes < 24 * 60:
        return f"{text}，再 {minutes // 60} 小時開始"
    return f"{text}，還有 {minutes // (24 * 60)} 天"


def send_due_reminders(now=None):
    """發送到期的行程提醒；回傳發了幾個行程"""
    now = now or timezone.now()
    until = send_until(now)
    candidates = (Itinerary.objects
                  .filter(is_notified=False, date_time__isnull=False, date_time__gt=now - GRACE, date_time__lte=until + MAX_AHEAD)
                  .select_related("creator"))
    count = 0
    for it in candidates:
        if it.date_time - timedelta(minutes=it.notify_minutes_before) > until:
            continue
        # 先標記再發送，避免同時兩次檢查重複提醒
        if not Itinerary.objects.filter(pk=it.pk, is_notified=False).update(is_notified=True):
            continue
        users = list(it.recipients())   # 建立者、所有分享群組的成員、透過分享連結加入的人
        body = _when(it.date_time, now) + (f"・📍 {it.location}" if it.location else "")
        ok, failed = send_to_users(users, f"⏰ {it.title}", body, url="/?tab=plan", tag=f"itinerary-{it.pk}")
        logger.info("行程提醒 #%s：成功 %s、失敗 %s", it.pk, ok, failed)
        count += 1
    return count
