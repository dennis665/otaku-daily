import json
from datetime import timedelta
from unittest import mock

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from .models import Group, GroupInvitation, GroupMember, Itinerary


def local_str(dt):
    return timezone.localtime(dt).strftime("%Y-%m-%dT%H:%M")


class PlannerTests(TestCase):
    def setUp(self):
        self.alice = User.objects.create_user("alice", password="pw-alice-123")
        self.bob = User.objects.create_user("bob", password="pw-bob-123")
        self.eve = User.objects.create_user("eve", password="pw-eve-123")

    def post(self, user, url, body=None):
        self.client.force_login(user)
        return self.client.post(url, json.dumps(body or {}), content_type="application/json", secure=True)

    def get_list(self, user):
        self.client.force_login(user)
        return self.client.get("/plan/api/itineraries/", secure=True).json()

    def create(self, user, **fields):
        body = {"title": "吃拉麵", "type": "EAT", "date_time": local_str(timezone.now() + timedelta(days=2)), **fields}
        res = self.post(user, "/plan/api/itineraries/", body)
        self.assertEqual(res.status_code, 200, res.content)
        return res.json()["item"]

    def test_personal_itinerary_only_visible_to_creator(self):
        item = self.create(self.alice)
        self.assertEqual([i["id"] for i in self.get_list(self.alice)["upcoming"]], [item["id"]])
        self.assertEqual(self.get_list(self.eve)["upcoming"], [])
        # 別人不能改、刪、定案（看不到 → 404）
        self.assertEqual(self.post(self.eve, f"/plan/api/itineraries/{item['id']}/delete/").status_code, 404)
        self.assertTrue(Itinerary.objects.filter(pk=item["id"]).exists())

    def test_multiple_groups_and_recipients(self):
        g1 = Group.objects.create(name="A團", created_by=self.alice)
        g2 = Group.objects.create(name="B團", created_by=self.alice)
        for g in (g1, g2):
            GroupMember.objects.create(group=g, user=self.alice, is_owner=True)
        GroupMember.objects.create(group=g1, user=self.bob)
        GroupMember.objects.create(group=g2, user=self.eve)
        item = self.create(self.alice, group_ids=[g1.id, g2.id])
        self.assertEqual(sorted(g["name"] for g in item["groups"]), ["A團", "B團"])
        # 兩個群組的成員都看得到；提醒對象 = 建立者 + 兩個群組成員（不用按有興趣）
        self.assertEqual([i["id"] for i in self.get_list(self.bob)["upcoming"]], [item["id"]])
        self.assertEqual([i["id"] for i in self.get_list(self.eve)["upcoming"]], [item["id"]])
        it = Itinerary.objects.get(pk=item["id"])
        self.assertEqual(sorted(u.username for u in it.recipients()), ["alice", "bob", "eve"])
        # bob 只在 A團：編輯時只勾 A團，B團（他沒加入）會保留，不會被拿掉
        res = self.post(self.bob, f"/plan/api/itineraries/{item['id']}/", {"title": "改", "date_time": item["date_time"], "group_ids": [g1.id]})
        self.assertEqual(sorted(g["name"] for g in res.json()["item"]["groups"]), ["A團", "B團"])
        # 不能分享到自己沒加入的群組
        res = self.post(self.bob, "/plan/api/itineraries/", {"title": "x", "date_time": "", "group_ids": [g2.id]})
        self.assertEqual(res.status_code, 400)

    def test_tbd_and_finalize(self):
        item = self.create(self.alice, date_time="")
        data = self.get_list(self.alice)
        self.assertEqual([i["id"] for i in data["tbd"]], [item["id"]])
        when = local_str(timezone.now() + timedelta(days=5))
        res = self.post(self.alice, f"/plan/api/itineraries/{item['id']}/finalize/", {"date_time": when})
        self.assertEqual(res.json()["item"]["date_time"], when)
        self.assertEqual([i["id"] for i in self.get_list(self.alice)["upcoming"]], [item["id"]])

    def test_group_flow_and_permissions(self):
        self.client.force_login(self.alice)
        g = self.post(self.alice, "/plan/api/groups/", {"name": "週末團"}).json()["group"]
        group = Group.objects.get(pk=g["id"])
        # bob 用邀請連結加入
        self.client.force_login(self.bob)
        page = self.client.get(f"/plan/join/{group.invite_code}/", secure=True)
        self.assertContains(page, "週末團")
        res = self.client.post(f"/plan/join/{group.invite_code}/", secure=True)
        self.assertRedirects(res, "/?tab=plan", fetch_redirect_response=False)
        self.assertTrue(GroupMember.objects.filter(group=group, user=self.bob).exists())

        item = self.create(self.alice, group_ids=[group.id])
        bob_view = self.get_list(self.bob)["upcoming"]
        self.assertEqual([i["id"] for i in bob_view], [item["id"]])
        self.assertTrue(bob_view[0]["can_manage"])
        # 非成員看不到、也不能把行程放進別人的群組
        self.assertEqual(self.get_list(self.eve)["upcoming"], [])
        res = self.post(self.eve, "/plan/api/itineraries/", {"title": "x", "date_time": "", "group_ids": [group.id]})
        self.assertEqual(res.status_code, 400)
        # 群組成員可以編輯
        res = self.post(self.bob, f"/plan/api/itineraries/{item['id']}/", {"title": "改吃燒肉", "date_time": item["date_time"], "group_ids": [group.id]})
        self.assertEqual(res.json()["item"]["title"], "改吃燒肉")

    def test_share_link_join_grants_view_and_reminder_but_not_manage(self):
        item = self.create(self.alice)
        token = Itinerary.objects.get(pk=item["id"]).share_token
        self.client.force_login(self.eve)
        self.assertContains(self.client.get(f"/plan/i/{token}/", secure=True), "吃拉麵")
        self.client.post(f"/plan/i/{token}/", secure=True)
        eve_view = self.get_list(self.eve)["upcoming"]
        self.assertEqual([i["id"] for i in eve_view], [item["id"]])
        self.assertFalse(eve_view[0]["can_manage"])
        self.assertEqual(self.post(self.eve, f"/plan/api/itineraries/{item['id']}/delete/").status_code, 403)
        self.assertIn(self.eve, Itinerary.objects.get(pk=item["id"]).recipients())

    def test_history_hide_is_per_user_and_past_cannot_edit(self):
        it = Itinerary.objects.create(creator=self.alice, title="上週聚餐", date_time=timezone.now() - timedelta(days=3))
        self.assertEqual([i["id"] for i in self.get_list(self.alice)["history"]], [it.id])
        res = self.post(self.alice, f"/plan/api/itineraries/{it.id}/", {"title": "改", "date_time": ""})
        self.assertEqual(res.status_code, 400)
        self.post(self.alice, f"/plan/api/itineraries/{it.id}/hide/")
        self.assertEqual(self.get_list(self.alice)["history"], [])

    def test_validation_and_links(self):
        res = self.post(self.alice, "/plan/api/itineraries/", {"title": "  ", "date_time": ""})
        self.assertEqual(res.status_code, 400)
        item = self.create(self.alice, links=[{"title": "官網", "url": "https://example.com"}, {"url": "javascript:alert(1)"}])
        self.assertEqual(item["links"], [{"title": "官網", "url": "https://example.com"}])
        self.assertIn("calendar.google.com", item["gcal_url"])

    def test_last_member_leaving_deletes_group(self):
        g = self.post(self.alice, "/plan/api/groups/", {"name": "solo"}).json()["group"]
        item = self.create(self.alice, group_ids=[g["id"]])
        self.post(self.alice, f"/plan/api/groups/{g['id']}/leave/")
        self.assertFalse(Group.objects.filter(pk=g["id"]).exists())
        # 群組行程變成建立者的個人行程，不會消失
        self.assertFalse(Itinerary.objects.get(pk=item["id"]).groups.exists())

    def test_requires_login(self):
        res = self.client.get("/plan/api/itineraries/", secure=True)
        self.assertEqual(res.status_code, 302)


@mock.patch("planner.views.send_to_users")
class InvitationTests(TestCase):
    def setUp(self):
        self.alice = User.objects.create_user("alice", password="pw-alice-123")
        self.bob = User.objects.create_user("bobby", password="pw-bob-123")
        self.eve = User.objects.create_user("eve", password="pw-eve-123")
        self.group = Group.objects.create(name="測試群", created_by=self.alice)
        GroupMember.objects.create(group=self.group, user=self.alice, is_owner=True)

    def post(self, user, url, body=None):
        self.client.force_login(user)
        return self.client.post(url, json.dumps(body or {}), content_type="application/json", secure=True)

    def search(self, user, q):
        self.client.force_login(user)
        return [u["username"] for u in self.client.get(f"/plan/api/users/search/?group={self.group.id}&q={q}", secure=True).json()["users"]]

    def test_search_rules(self, send):
        self.assertEqual(self.search(self.alice, "b"), [])            # 至少 2 個字
        self.assertEqual(self.search(self.alice, "bob"), ["bobby"])
        self.assertEqual(self.search(self.alice, "ali"), [])          # 不會搜到自己
        GroupMember.objects.create(group=self.group, user=self.bob)
        self.assertEqual(self.search(self.alice, "bob"), [])          # 已在群組的不列出

    def test_invite_accept_flow_with_notifications(self, send):
        res = self.post(self.alice, f"/plan/api/groups/{self.group.id}/invite/", {"username": "bobby"})
        self.assertEqual(res.status_code, 200)
        users, title, body = send.call_args.args
        self.assertEqual(users, [self.bob])
        self.assertIn("alice 邀請你加入「測試群」", body)
        # 重複邀請
        self.assertEqual(self.post(self.alice, f"/plan/api/groups/{self.group.id}/invite/", {"username": "bobby"}).status_code, 400)
        # bob 看到邀請、接受
        self.client.force_login(self.bob)
        invs = self.client.get("/plan/api/itineraries/", secure=True).json()["invitations"]
        self.assertEqual([(i["group"], i["inviter"]) for i in invs], [("測試群", "alice")])
        self.post(self.bob, f"/plan/api/invitations/{invs[0]['id']}/accept/")
        self.assertTrue(GroupMember.objects.filter(group=self.group, user=self.bob).exists())
        self.assertFalse(GroupInvitation.objects.exists())
        self.assertEqual(send.call_args.args[0], [self.alice])   # 通知邀請人

    def test_decline_and_permissions(self, send):
        self.post(self.alice, f"/plan/api/groups/{self.group.id}/invite/", {"username": "bobby"})
        inv = GroupInvitation.objects.get()
        # 別人不能代替接受
        self.assertEqual(self.post(self.eve, f"/plan/api/invitations/{inv.id}/accept/").status_code, 404)
        self.post(self.bob, f"/plan/api/invitations/{inv.id}/decline/")
        self.assertFalse(GroupMember.objects.filter(user=self.bob).exists())
        # 非成員不能邀請別人進群組
        self.assertEqual(self.post(self.eve, f"/plan/api/groups/{self.group.id}/invite/", {"username": "bobby"}).status_code, 404)
        self.assertEqual(self.post(self.alice, f"/plan/api/groups/{self.group.id}/invite/", {"username": "nobody"}).status_code, 400)

    def test_new_group_itinerary_notifies_other_members(self, send):
        GroupMember.objects.create(group=self.group, user=self.bob)
        self.post(self.alice, "/plan/api/itineraries/", {"title": "唱歌", "date_time": "", "group_ids": [self.group.id]})
        users, title, body = send.call_args.args
        self.assertEqual(users, [self.bob])
        self.assertIn("唱歌", body)
        send.reset_mock()
        self.post(self.alice, "/plan/api/itineraries/", {"title": "個人", "date_time": ""})
        send.assert_not_called()


class ImportTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("dennis", password="pw-dennis-123")
        self.client.force_login(self.user)

    def upload(self, data):
        from django.core.files.uploadedfile import SimpleUploadedFile
        f = SimpleUploadedFile("export.json", json.dumps(data, ensure_ascii=False).encode(), content_type="application/json")
        return self.client.post("/plan/import/", {"file": f}, secure=True)

    def test_import_and_reimport_skips_duplicates(self):
        data = {"group_name": "行程助手", "itineraries": [
            {"title": "聯名咖啡廳", "activity_type": "EAT", "date_time": "2099-12-05T03:00:00+00:00", "location": "待定",
             "links": [{"title": "資訊1", "url": "https://a.example"}, {"title": "壞", "url": "ftp://x"}],
             "notify_minutes_before": 1440, "interested_users": ["一陣風", "小明"], "creator": "一陣風", "is_hidden": False},
            {"title": "舊聚餐", "activity_type": "BAD", "date_time": "2020-01-01T03:00:00+00:00", "is_hidden": True, "creator": "一陣風"},
            {"title": "", "date_time": ""},
        ]}
        res = self.upload(data)
        self.assertContains(res, "新增 2 筆行程")
        g = Group.objects.get(name="行程助手")
        self.assertTrue(GroupMember.objects.filter(group=g, user=self.user, is_owner=True).exists())
        future = Itinerary.objects.get(title="聯名咖啡廳")
        self.assertEqual(future.links, [{"title": "資訊1", "url": "https://a.example"}])
        self.assertIn("有興趣：一陣風、小明", future.notes)
        self.assertFalse(future.is_notified)
        old = Itinerary.objects.get(title="舊聚餐")
        self.assertEqual(old.activity_type, "OTHER")
        self.assertTrue(old.is_notified)
        self.assertTrue(old.hidden_by.filter(pk=self.user.pk).exists())
        # 再匯入一次：不重複、沿用同一個群組
        self.assertContains(self.upload(data), "新增 0 筆行程")
        self.assertEqual(Group.objects.filter(name="行程助手").count(), 1)
        self.assertEqual(Itinerary.objects.count(), 2)

    def test_bad_file(self):
        from django.core.files.uploadedfile import SimpleUploadedFile
        res = self.client.post("/plan/import/", {"file": SimpleUploadedFile("x.json", b"not json")}, secure=True)
        self.assertContains(res, "檔案格式不對")
