import json
from datetime import timedelta

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from .models import Group, GroupMember, Itinerary


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

    def test_creator_is_interested_by_default(self):
        item = self.create(self.alice)
        self.assertTrue(item["i_am_interested"])
        self.assertEqual(item["interested"], ["alice"])

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

        item = self.create(self.alice, group_id=group.id)
        bob_view = self.get_list(self.bob)["upcoming"]
        self.assertEqual([i["id"] for i in bob_view], [item["id"]])
        self.assertTrue(bob_view[0]["can_manage"])
        # 非成員看不到、也不能把行程放進別人的群組
        self.assertEqual(self.get_list(self.eve)["upcoming"], [])
        res = self.post(self.eve, "/plan/api/itineraries/", {"title": "x", "date_time": "", "group_id": group.id})
        self.assertEqual(res.status_code, 400)
        # 群組成員可以編輯
        res = self.post(self.bob, f"/plan/api/itineraries/{item['id']}/", {"title": "改吃燒肉", "date_time": item["date_time"], "group_id": group.id})
        self.assertEqual(res.json()["item"]["title"], "改吃燒肉")

    def test_share_link_interest_grants_view_but_not_manage(self):
        item = self.create(self.alice)
        token = Itinerary.objects.get(pk=item["id"]).share_token
        self.client.force_login(self.eve)
        self.assertContains(self.client.get(f"/plan/i/{token}/", secure=True), "吃拉麵")
        self.client.post(f"/plan/i/{token}/", secure=True)
        eve_view = self.get_list(self.eve)["upcoming"]
        self.assertEqual([i["id"] for i in eve_view], [item["id"]])
        self.assertFalse(eve_view[0]["can_manage"])
        self.assertEqual(self.post(self.eve, f"/plan/api/itineraries/{item['id']}/delete/").status_code, 403)
        # 取消有興趣後就看不到了
        self.post(self.eve, f"/plan/api/itineraries/{item['id']}/interest/")
        self.assertEqual(self.get_list(self.eve)["upcoming"], [])

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
        item = self.create(self.alice, group_id=g["id"])
        self.post(self.alice, f"/plan/api/groups/{g['id']}/leave/")
        self.assertFalse(Group.objects.filter(pk=g["id"]).exists())
        # 群組行程變成建立者的個人行程，不會消失
        self.assertIsNone(Itinerary.objects.get(pk=item["id"]).group_id)

    def test_requires_login(self):
        res = self.client.get("/plan/api/itineraries/", secure=True)
        self.assertEqual(res.status_code, 302)
