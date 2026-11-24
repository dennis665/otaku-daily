from django.contrib.auth.models import User
from django.test import TestCase

from .names import NICKNAME_MAX, display_name



class ProfileTests(TestCase):
    def setUp(self):
        self.alice = User.objects.create_user("alice", password="pw-alice-123")
        self.bob = User.objects.create_user("bob", password="pw-bob-123")

    def test_set_and_clear_nickname(self):
        self.client.force_login(self.alice)
        self.assertEqual(self.client.get("/accounts/profile/", secure=True).status_code, 200)
        r = self.client.post("/accounts/profile/", {"nickname": "  芙莉蓮   粉 "}, secure=True)
        self.assertRedirects(r, "/accounts/profile/?saved=1", fetch_redirect_response=False)
        self.alice.refresh_from_db()
        self.assertEqual(self.alice.first_name, "芙莉蓮 粉")
        self.assertEqual(display_name(self.alice), "芙莉蓮 粉")
        self.client.post("/accounts/profile/", {"nickname": ""}, secure=True)
        self.alice.refresh_from_db()
        self.assertEqual(display_name(self.alice), "alice")

    def test_nickname_too_long(self):
        self.client.force_login(self.alice)
        r = self.client.post("/accounts/profile/", {"nickname": "長" * (NICKNAME_MAX + 1)}, secure=True)
        self.assertEqual(r.status_code, 200)
        self.alice.refresh_from_db()
        self.assertEqual(self.alice.first_name, "")

    def test_login_required(self):
        r = self.client.get("/accounts/profile/", secure=True)
        self.assertEqual(r.status_code, 302)

    def test_nickname_shown_in_planner(self):
        from planner.models import Group, GroupMember
        self.alice.first_name = "小愛"
        self.alice.save()
        g = Group.objects.create(name="週末團")
        GroupMember.objects.create(group=g, user=self.alice, is_owner=True)
        self.client.force_login(self.alice)
        data = self.client.get("/plan/api/groups/", secure=True).json()
        self.assertEqual(data["groups"][0]["members"], ["小愛"])
        # 用暱稱也搜尋得到，回傳帳號（邀請用）與暱稱（顯示用）
        self.client.force_login(self.bob)
        users = self.client.get("/plan/api/users/search/?q=小愛", secure=True).json()["users"]
        self.assertEqual(users, [{"username": "alice", "name": "小愛", "invited": False}])
