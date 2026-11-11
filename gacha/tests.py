import random
from collections import Counter

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from dramas.models import Follow, Work

from . import cards, service
from .models import FREE_DAILY, PITY_AT, Card, GachaState, OwnedCard, Pull

User = get_user_model()


def setUpModule():
    # 測試不連 GitHub 讀卡片索引
    cards._state["at"] = 1e18


def make_work(sid, title, rarities=("N", "R", "SR", "SSR")):
    w = Work.objects.create(source_id=sid, title=title)
    for i, r in enumerate(rarities):
        Card.objects.create(work=w, rarity=r, file=f"{sid}/{r}_{i}.webp")
    return w


class GachaTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("amy", password="pw-123456")
        self.w1 = make_work(1, "芙莉蓮")
        self.w2 = make_work(2, "藥師")
        self.empty = Work.objects.create(source_id=3, title="沒有卡片的作品")

    def test_rarity_distribution_roughly_matches(self):
        rng = random.Random(1)
        c = Counter(service.roll_rarity(rng) for _ in range(20000))
        self.assertAlmostEqual(c["N"] / 20000, 0.55, delta=0.02)
        self.assertAlmostEqual(c["SSR"] / 20000, 0.05, delta=0.01)
        self.assertTrue(all(service.roll_rarity(rng, pity=True) in service.HIGH for _ in range(200)))

    def test_follow_pull_once_per_day_and_only_works_with_cards(self):
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.w1.id)            # 沒追不能抽
        Follow.objects.create(user=self.user, work=self.w1)
        Follow.objects.create(user=self.user, work=self.empty)
        self.assertEqual(service.status(self.user)["follow_left"], [self.w1.id])   # 沒卡片的作品不列出
        service.pull(self.user, self.w1.id)
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.w1.id)            # 同一天不能再抽
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.empty.id)
        self.assertEqual(service.status(self.user)["follow_left"], [])

    def test_same_rarity_can_have_many_cards(self):
        w = make_work(9, "多卡作品", rarities=("N", "N", "N"))
        got = {service.pick_card(w.id, False, random.Random(i)).id for i in range(60)}
        self.assertEqual(len(got), 3)   # 三張 N 都抽得到

    def test_missing_rarity_falls_back(self):
        w = make_work(8, "只有 R", rarities=("R",))
        self.assertTrue(all(service.pick_card(w.id, False, random.Random(i)).rarity == "R" for i in range(30)))

    def test_free_pulls_limited_and_owned_counts(self):
        for _ in range(FREE_DAILY):
            p, _ = service.pull(self.user)
            self.assertIn(p.work_id, {self.w1.id, self.w2.id})
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

    def test_apply_index_creates_and_deactivates(self):
        Work.objects.create(source_id=77, title="新作品")
        created, gone = cards.apply_index({"works": {"77": [{"file": "77/SSR_abcdef12.webp", "rarity": "SSR", "name": "主角"}]}})
        self.assertEqual(created, 1)
        self.assertTrue(Card.objects.get(file="77/SSR_abcdef12.webp").active)
        created, gone = cards.apply_index({"works": {}})
        self.assertFalse(Card.objects.get(file="77/SSR_abcdef12.webp").active)
        self.assertGreater(gone, 0)


class GachaApiTests(TestCase):
    def test_pull_and_album(self):
        user = User.objects.create_user("bob", password="pw-123456")
        w = make_work(10, "葬送的芙莉蓮")
        Follow.objects.create(user=user, work=w)
        self.client.force_login(user)
        s = self.client.get("/gacha/api/status/").json()
        self.assertEqual([x["id"] for x in s["follow_left"]], [w.id])
        r = self.client.post("/gacha/api/pull/", {"work_id": w.id}).json()
        self.assertTrue(r["ok"] and r["card"]["new"])
        self.assertTrue(r["card"]["image"].endswith(".webp"))
        self.assertEqual(self.client.post("/gacha/api/pull/", {"work_id": w.id}).status_code, 400)
        album = self.client.get("/gacha/api/album/").json()
        self.assertEqual(album["works"][0]["have"], 1)
        self.assertEqual(album["works"][0]["total"], 4)   # 這部作品的所有卡都列出（沒抽到的顯示剪影）

    def test_pull_all_follows_once(self):
        user = User.objects.create_user("cat", password="pw-123456")
        for i in range(3):
            Follow.objects.create(user=user, work=make_work(100 + i, f"作品{i}"))
        self.client.force_login(user)
        r = self.client.post("/gacha/api/pull-all/").json()
        self.assertEqual(len(r["cards"]), 3)
        self.assertEqual(r["status"]["follow_left"], [])
        self.assertEqual(self.client.post("/gacha/api/pull-all/").status_code, 400)


class UnlimitedUserTests(TestCase):
    def test_unlimited_user_can_pull_repeatedly(self):
        user = User.objects.create_user("dennis", password="pw-123456")
        w = make_work(500, "測試作品")
        Follow.objects.create(user=user, work=w)
        with override_settings(GACHA_UNLIMITED_USERS={"dennis"}):
            for _ in range(FREE_DAILY + 2):
                service.pull(user)
                service.pull(user, w.id)
            self.assertEqual(service.status(user)["follow_left"], [w.id])
        with override_settings(GACHA_UNLIMITED_USERS=set()):
            with self.assertRaises(service.PullError):
                service.pull(user)


class CardImageTests(TestCase):
    def test_image_needs_login_and_serves_from_card_repo(self):
        import os
        import tempfile
        from unittest import mock
        with tempfile.TemporaryDirectory() as d:
            os.makedirs(os.path.join(d, "5"))
            with open(os.path.join(d, "5", "SSR_abcdef12.webp"), "wb") as f:
                f.write(b"RIFFxxxxWEBP")
            with mock.patch.dict(os.environ, {"CARD_LOCAL_DIR": d}):
                url = "/gacha/img/5/SSR_abcdef12.webp"
                self.assertEqual(self.client.get(url).status_code, 302)   # 沒登入看不到
                self.client.force_login(User.objects.create_user("eve", password="pw-123456"))
                res = self.client.get(url)
                self.assertEqual(res.status_code, 200)
                self.assertEqual(res["Content-Type"], "image/webp")
                self.assertEqual(self.client.get("/gacha/img/../../settings.py").status_code, 404)
