import random
from collections import Counter

from django.contrib.auth import get_user_model
from django.test import TestCase

from dramas.models import Follow, Work

from . import service
from .models import FREE_DAILY, PITY_AT, GachaState, OwnedCard, Pull

User = get_user_model()


class GachaTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("amy", password="pw-123456")
        self.w1 = Work.objects.create(source_id=1, title="芙莉蓮", images=["a.jpg"])
        self.w2 = Work.objects.create(source_id=2, title="藥師", images=["b.jpg"])

    def test_rarity_distribution_roughly_matches(self):
        rng = random.Random(1)
        c = Counter(service.roll_rarity(rng) for _ in range(20000))
        self.assertAlmostEqual(c["N"] / 20000, 0.55, delta=0.02)
        self.assertAlmostEqual(c["SSR"] / 20000, 0.05, delta=0.01)
        self.assertTrue(all(service.roll_rarity(rng, pity=True) in service.HIGH for _ in range(200)))

    def test_follow_pull_once_per_day(self):
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.w1.id)            # 沒追不能抽
        Follow.objects.create(user=self.user, work=self.w1)
        service.pull(self.user, self.w1.id)
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.w1.id)            # 同一天不能再抽
        self.assertEqual(service.status(self.user)["follow_left"], [])

    def test_free_pulls_limited_and_owned_counts(self):
        for _ in range(FREE_DAILY):
            service.pull(self.user)
        with self.assertRaises(service.PullError):
            service.pull(self.user)
        self.assertEqual(sum(OwnedCard.objects.filter(user=self.user).values_list("count", flat=True)), FREE_DAILY)

    def test_pity_guarantees_high_rarity(self):
        GachaState.objects.create(user=self.user, since_ssr=PITY_AT - 1)
        p, _ = service.pull(self.user, rng=random.Random(0))
        self.assertTrue(p.pity)
        self.assertIn(p.rarity, service.HIGH)
        self.assertEqual(GachaState.objects.get(user=self.user).since_ssr, 0)
        self.assertEqual(Pull.objects.count(), 1)


class GachaApiTests(TestCase):
    def test_pull_and_album(self):
        user = User.objects.create_user("bob", password="pw-123456")
        w = Work.objects.create(source_id=9, title="葬送的芙莉蓮", images=["1.jpg", "2.jpg"])
        Follow.objects.create(user=user, work=w)
        self.client.force_login(user)
        s = self.client.get("/gacha/api/status/").json()
        self.assertEqual([x["id"] for x in s["follow_left"]], [w.id])
        r = self.client.post("/gacha/api/pull/", {"work_id": w.id}).json()
        self.assertTrue(r["ok"] and r["card"]["new"])
        self.assertEqual(self.client.post("/gacha/api/pull/", {"work_id": w.id}).status_code, 400)
        album = self.client.get("/gacha/api/album/").json()
        self.assertEqual(album["works"][0]["have"], 1)


class PullAllTests(TestCase):
    def test_pull_all_follows_once(self):
        user = User.objects.create_user("cat", password="pw-123456")
        ws = [Work.objects.create(source_id=100 + i, title=f"作品{i}", images=["x.jpg"]) for i in range(3)]
        for w in ws:
            Follow.objects.create(user=user, work=w)
        self.client.force_login(user)
        r = self.client.post("/gacha/api/pull-all/").json()
        self.assertEqual(len(r["cards"]), 3)
        self.assertEqual(r["status"]["follow_left"], [])
        self.assertEqual(self.client.post("/gacha/api/pull-all/").status_code, 400)
