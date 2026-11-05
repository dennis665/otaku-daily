import json
from datetime import datetime, timedelta
from unittest import mock
from zoneinfo import ZoneInfo

from django.contrib.auth.models import User
from django.test import TestCase
from pywebpush import WebPushException

from planner.models import Group, GroupMember, Itinerary

from .models import PushSubscription, VapidKey
from .reminders import send_due_reminders, send_until

TPE = ZoneInfo("Asia/Taipei")


def tpe(y, mo, d, h, mi=0):
    return datetime(y, mo, d, h, mi, tzinfo=TPE)


class FakeResponse:
    def __init__(self, status):
        self.status_code = status
        self.text = ""


class NotifyTests(TestCase):
    def setUp(self):
        self.alice = User.objects.create_user("alice", password="pw-alice-123")
        self.bob = User.objects.create_user("bob", password="pw-bob-123")

    def subscribe(self, user, n=1):
        return PushSubscription.objects.create(user=user, endpoint=f"https://push.example.com/{user.username}/{n}", p256dh="k", auth="a")

    # ---------- 檢查時間範圍 ----------
    def test_send_until_daytime_and_night(self):
        self.assertEqual(send_until(tpe(2026, 11, 5, 10, 0)), tpe(2026, 11, 5, 10, 15))
        # 22:00 最後一次 → 發到隔天 08:00
        self.assertEqual(send_until(tpe(2026, 11, 5, 22, 0)), tpe(2026, 11, 6, 8, 0))
        self.assertEqual(send_until(tpe(2026, 11, 5, 21, 50)), tpe(2026, 11, 6, 8, 0))
        # 凌晨被叫醒（例如手動執行）→ 發到當天 08:00
        self.assertEqual(send_until(tpe(2026, 11, 6, 3, 0)), tpe(2026, 11, 6, 8, 0))

    # ---------- 行程提醒 ----------
    @mock.patch("notifications.push.webpush")
    def test_reminder_sent_once_to_group_members_without_interest(self, webpush):
        now = tpe(2026, 11, 5, 10, 0)
        it = Itinerary.objects.create(creator=self.alice, title="吃拉麵", date_time=now + timedelta(minutes=70), notify_minutes_before=60, location="西門")
        g = Group.objects.create(name="群", created_by=self.alice)
        GroupMember.objects.create(group=g, user=self.alice)
        GroupMember.objects.create(group=g, user=self.bob)
        it.groups.add(g)   # bob 沒按任何按鈕，只是群組成員
        self.subscribe(self.alice)
        self.subscribe(self.bob)
        self.assertEqual(send_due_reminders(now), 1)
        self.assertEqual(webpush.call_count, 2)
        payload = json.loads(webpush.call_args.kwargs["data"])
        self.assertEqual(payload["title"], "⏰ 吃拉麵")
        self.assertIn("西門", payload["body"])
        # 第二次檢查不重複發
        self.assertEqual(send_due_reminders(now + timedelta(minutes=30)), 0)
        self.assertEqual(webpush.call_count, 2)

    @mock.patch("notifications.push.webpush")
    def test_reminder_not_yet_due(self, webpush):
        now = tpe(2026, 11, 5, 10, 0)
        Itinerary.objects.create(creator=self.alice, title="晚餐", date_time=now + timedelta(hours=5), notify_minutes_before=60)
        self.subscribe(self.alice)
        self.assertEqual(send_due_reminders(now), 0)
        webpush.assert_not_called()

    @mock.patch("notifications.push.webpush")
    def test_night_reminder_sent_at_22(self, webpush):
        it = Itinerary.objects.create(creator=self.alice, title="早上展覽", date_time=tpe(2026, 11, 6, 9, 0), notify_minutes_before=60)
        self.subscribe(self.alice)
        self.assertEqual(send_due_reminders(tpe(2026, 11, 5, 22, 0)), 1)   # 提醒時間 08:00 → 22:00 先發

    @mock.patch("notifications.push.webpush")
    def test_expired_subscription_is_deleted(self, webpush):
        webpush.side_effect = WebPushException("gone", response=FakeResponse(410))
        now = tpe(2026, 11, 5, 10, 0)
        it = Itinerary.objects.create(creator=self.alice, title="x", date_time=now + timedelta(minutes=5), notify_minutes_before=10)
        self.subscribe(self.alice)
        send_due_reminders(now)
        self.assertFalse(PushSubscription.objects.exists())

    # ---------- API ----------
    def test_subscribe_status_unsubscribe(self):
        self.client.force_login(self.alice)
        status = self.client.get("/notify/api/status/", secure=True).json()
        self.assertTrue(status["public_key"])
        self.assertEqual(VapidKey.objects.count(), 1)   # 第一次使用時自動產生
        body = {"endpoint": "https://push.example.com/abc", "keys": {"p256dh": "p", "auth": "a"}}
        res = self.client.post("/notify/api/subscribe/", json.dumps(body), content_type="application/json", secure=True, HTTP_USER_AGENT="Mozilla iPhone")
        self.assertEqual(res.status_code, 200)
        devices = self.client.get("/notify/api/status/", secure=True).json()["devices"]
        self.assertEqual([d["label"] for d in devices], ["iPhone"])
        self.assertEqual(self.client.get("/notify/api/status/", secure=True).json()["public_key"], status["public_key"])
        self.client.post("/notify/api/unsubscribe/", json.dumps({"endpoint": body["endpoint"]}), content_type="application/json", secure=True)
        self.assertFalse(PushSubscription.objects.exists())

    def test_subscribe_rejects_bad_data(self):
        self.client.force_login(self.alice)
        res = self.client.post("/notify/api/subscribe/", json.dumps({"endpoint": "http://x"}), content_type="application/json", secure=True)
        self.assertEqual(res.status_code, 400)

    @mock.patch("notifications.push.webpush")
    def test_test_endpoint(self, webpush):
        self.client.force_login(self.alice)
        self.assertEqual(self.client.post("/notify/api/test/", secure=True).status_code, 400)   # 還沒有裝置
        self.subscribe(self.alice)
        self.subscribe(self.alice, 2)
        res = self.client.post("/notify/api/test/", secure=True).json()
        self.assertEqual((res["sent"], res["failed"]), (2, 0))

    @mock.patch("notifications.push.webpush")
    def test_tick_endpoint_no_login_needed(self, webpush):
        res = self.client.post("/notify/tick/", secure=True)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["reminders"], 0)
