import json
from datetime import timedelta
from unittest import mock

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from .models import MAX_FILE_IOS, MAX_FILES, MAX_TOTAL, Device, Transfer


class TransferTests(TestCase):
    def setUp(self):
        self.alice = User.objects.create_user("alice", password="pw-alice-123")
        self.bob = User.objects.create_user("bob", password="pw-bob-123")

    def post(self, user, url, body=None):
        self.client.force_login(user)
        return self.client.post(url, json.dumps(body or {}), content_type="application/json", secure=True)

    def poll(self, user, device_id, platform="desktop", name="電腦"):
        return self.post(user, "/transfer/api/poll/", {"device_id": device_id, "platform": platform, "name": name}).json()

    def send(self, user, from_id, to_pk, files=None, offer="offer-sdp"):
        return self.post(user, "/transfer/api/send/", {
            "device_id": from_id, "to": to_pk, "offer": offer,
            "files": files if files is not None else [{"name": "a.jpg", "size": 1000, "type": "image/jpeg"}],
        })

    def pair(self, phone_platform="ios"):
        pc = self.poll(self.alice, "pc-00000001")
        phone = self.poll(self.alice, "phone-0000001", phone_platform, "iPhone")
        return pc["me"]["id"], phone["me"]["id"]

    def test_poll_registers_device_and_lists_my_other_devices(self):
        pc_id, phone_id = self.pair()
        data = self.poll(self.alice, "pc-00000001")
        self.assertEqual([d["id"] for d in data["devices"]], [phone_id])
        self.assertTrue(data["devices"][0]["online"])
        self.assertEqual(Device.objects.filter(user=self.alice).count(), 2)
        # 別人的裝置看不到
        self.assertEqual(self.poll(self.bob, "bob-0000001")["devices"], [])

    def test_full_flow_offer_answer_done(self):
        pc_id, phone_id = self.pair()
        res = self.send(self.alice, "pc-00000001", phone_id)
        self.assertEqual(res.status_code, 200, res.content)
        tid = res.json()["id"]
        incoming = self.poll(self.alice, "phone-0000001", "ios")["incoming"]
        self.assertEqual(len(incoming), 1)
        self.assertEqual(incoming[0]["offer"], "offer-sdp")
        self.assertEqual(incoming[0]["from_name"], "電腦")
        # 傳送端自己不會收到
        self.assertEqual(self.poll(self.alice, "pc-00000001")["incoming"], [])

        r = self.post(self.alice, f"/transfer/api/{tid}/answer/", {"device_id": "phone-0000001", "answer": "answer-sdp"})
        self.assertEqual(r.status_code, 200, r.content)
        self.client.force_login(self.alice)
        d = self.client.get(f"/transfer/api/{tid}/", secure=True).json()
        self.assertEqual((d["status"], d["answer"]), ("accepted", "answer-sdp"))

        self.post(self.alice, f"/transfer/api/{tid}/status/", {"status": "done"})
        t = Transfer.objects.get(pk=tid)
        self.assertEqual(t.status, "done")
        self.assertEqual((t.offer, t.answer), ("", ""))   # 連線資訊用完就清掉
        # 已結束的不再改
        self.post(self.alice, f"/transfer/api/{tid}/status/", {"status": "failed"})
        self.assertEqual(Transfer.objects.get(pk=tid).status, "done")

    def test_only_target_device_can_answer(self):
        pc_id, phone_id = self.pair()
        tid = self.send(self.alice, "pc-00000001", phone_id).json()["id"]
        r = self.post(self.alice, f"/transfer/api/{tid}/answer/", {"device_id": "pc-00000001", "answer": "x"})
        self.assertEqual(r.status_code, 400)
        r = self.post(self.bob, f"/transfer/api/{tid}/answer/", {"device_id": "bob-0000001", "answer": "x"})
        self.assertEqual(r.status_code, 404)

    def test_cannot_send_to_other_users_device(self):
        self.pair()
        bob_dev = self.poll(self.bob, "bob-0000001")["me"]["id"]
        r = self.send(self.alice, "pc-00000001", bob_dev)
        self.assertEqual(r.status_code, 400)

    def test_cannot_send_to_offline_device(self):
        pc_id, phone_id = self.pair()
        Device.objects.filter(pk=phone_id).update(last_seen=timezone.now() - timedelta(minutes=5))
        r = self.send(self.alice, "pc-00000001", phone_id)
        self.assertEqual(r.status_code, 400)
        self.assertIn("不在線上", r.json()["error"])

    def test_limits(self):
        pc_id, phone_id = self.pair()
        too_many = [{"name": f"{i}.jpg", "size": 10} for i in range(MAX_FILES + 1)]
        self.assertEqual(self.send(self.alice, "pc-00000001", phone_id, too_many).status_code, 400)
        too_big = [{"name": "a.mp4", "size": MAX_TOTAL // 2 + 1}, {"name": "b.mp4", "size": MAX_TOTAL // 2 + 1}]
        self.assertEqual(self.send(self.alice, "phone-0000001", pc_id, too_big).status_code, 400)
        # 傳到 iPhone 單檔上限；傳到電腦則可以
        ios_big = [{"name": "v.mp4", "size": MAX_FILE_IOS + 1}]
        self.assertEqual(self.send(self.alice, "pc-00000001", phone_id, ios_big).status_code, 400)
        self.assertEqual(self.send(self.alice, "phone-0000001", pc_id, ios_big).status_code, 200)

    def test_decline_and_expire(self):
        pc_id, phone_id = self.pair()
        tid = self.send(self.alice, "pc-00000001", phone_id).json()["id"]
        self.post(self.alice, f"/transfer/api/{tid}/status/", {"status": "declined"})
        out = self.poll(self.alice, "pc-00000001")["outgoing"]
        self.assertEqual(out[0]["status"], "declined")

        tid2 = self.send(self.alice, "pc-00000001", phone_id).json()["id"]
        Transfer.objects.filter(pk=tid2).update(created_at=timezone.now() - timedelta(minutes=3))
        self.assertEqual(self.poll(self.alice, "phone-0000001", "ios")["incoming"], [])
        self.assertEqual(Transfer.objects.get(pk=tid2).status, "failed")

    def test_rename_and_remove_device(self):
        pc_id, phone_id = self.pair()
        r = self.post(self.alice, "/transfer/api/rename/", {"device_id": "pc-00000001", "name": "  公司  電腦 "})
        self.assertEqual(r.json()["me"]["name"], "公司 電腦")
        # 之後的 poll 不會把名字蓋回預設值
        self.assertEqual(self.poll(self.alice, "pc-00000001")["me"]["name"], "公司 電腦")
        self.assertEqual(self.post(self.bob, f"/transfer/api/devices/{phone_id}/remove/").status_code, 404)
        self.post(self.alice, f"/transfer/api/devices/{phone_id}/remove/")
        self.assertFalse(Device.objects.filter(pk=phone_id).exists())

    def make_group(self, *users):
        from planner.models import Group, GroupMember
        g = Group.objects.create(name="週末團")
        for u in users:
            GroupMember.objects.create(group=g, user=u)
        return g

    def test_group_friends_listed_and_can_send(self):
        self.alice.first_name = "小愛"
        self.alice.save()
        self.make_group(self.alice, self.bob)
        a_pc = self.poll(self.alice, "pc-00000001")["me"]["id"]
        b_phone = self.poll(self.bob, "bob-0000001", "ios", "iPhone")["me"]["id"]
        data = self.poll(self.alice, "pc-00000001")
        self.assertEqual(data["groups"][0]["name"], "週末團")
        self.assertEqual(data["friends"][0]["name"], "bob")
        self.assertEqual([d["id"] for d in data["friends"][0]["devices"]], [b_phone])
        # 朋友的裝置不會出現在「我的裝置」
        self.assertEqual(data["devices"], [])

        tid = self.send(self.alice, "pc-00000001", b_phone).json()["id"]
        incoming = self.poll(self.bob, "bob-0000001", "ios")["incoming"]
        self.assertEqual(incoming[0]["from_name"], "小愛（電腦）")
        r = self.post(self.bob, f"/transfer/api/{tid}/answer/", {"device_id": "bob-0000001", "answer": "ans"})
        self.assertEqual(r.status_code, 200, r.content)
        self.assertEqual(self.poll(self.alice, "pc-00000001")["outgoing"][0]["to_name"], "bob（iPhone）")
        # 朋友的 iPhone 一樣有單檔上限
        big = [{"name": "v.mp4", "size": MAX_FILE_IOS + 1}]
        self.assertEqual(self.send(self.alice, "pc-00000001", b_phone, big).status_code, 400)

    def test_offline_friend_listed_without_devices(self):
        self.make_group(self.alice, self.bob)
        self.poll(self.alice, "pc-00000001")
        friends = self.poll(self.alice, "pc-00000001")["friends"]
        self.assertEqual((friends[0]["name"], friends[0]["devices"]), ("bob", []))

    def test_max_targets(self):
        from .models import MAX_TARGETS
        users = [User.objects.create_user(f"u{i}", password="pw-123456-x") for i in range(MAX_TARGETS + 1)]
        self.make_group(self.alice, *users)
        self.poll(self.alice, "pc-00000001")
        ids = [self.poll(u, f"dev-{u.username}-0001")["me"]["id"] for u in users]
        for pk in ids[:MAX_TARGETS]:
            self.assertEqual(self.send(self.alice, "pc-00000001", pk).status_code, 200)
        r = self.send(self.alice, "pc-00000001", ids[MAX_TARGETS])
        self.assertEqual(r.status_code, 400)
        self.assertIn("同時最多", r.json()["error"])

    @mock.patch("transfer.views.send_to_users", return_value=(1, 0))
    def test_nudge(self, push):
        from django.core.cache import cache
        cache.clear()
        self.make_group(self.alice, self.bob)
        r = self.post(self.alice, "/transfer/api/nudge/", {"user": self.bob.id})
        self.assertEqual(r.status_code, 200, r.content)
        self.assertEqual(push.call_args.args[0], [self.bob])
        self.assertEqual(push.call_args.kwargs["url"], "/?transfer=1")
        # 1 分鐘內不重複通知
        self.assertEqual(self.post(self.alice, "/transfer/api/nudge/", {"user": self.bob.id}).status_code, 400)
        # 不是群組朋友不能通知
        eve = User.objects.create_user("eve", password="pw-eve-123")
        self.assertEqual(self.post(self.alice, "/transfer/api/nudge/", {"user": eve.id}).status_code, 404)

    @mock.patch("transfer.views.send_to_users", return_value=(0, 0))
    def test_nudge_without_push(self, push):
        from django.core.cache import cache
        cache.clear()
        self.make_group(self.alice, self.bob)
        r = self.post(self.alice, "/transfer/api/nudge/", {"user": self.bob.id})
        self.assertEqual(r.status_code, 400)
        self.assertIn("沒有開啟通知", r.json()["error"])

    def test_login_required(self):
        r = self.client.post("/transfer/api/poll/", "{}", content_type="application/json", secure=True)
        self.assertEqual(r.status_code, 302)
