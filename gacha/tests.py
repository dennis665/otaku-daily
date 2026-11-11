import random
from collections import Counter

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from dramas.models import Follow, Work

from . import cards, service
from .models import FREE_DAILY, PICK_DAILY, PITY_AT, TASK_REWARD, Card, GachaState, OwnedCard, Pull

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

    def test_pick_tickets_daily_then_bonus(self):
        # 不用追也可以自選任何有卡片的作品；每天 PICK_DAILY 張
        for _ in range(PICK_DAILY):
            service.pull(self.user, self.w1.id)
        self.assertEqual(service.status(self.user)["pick_left"], 0)
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.w2.id)                # 當天的券用完、也沒有保留券
        GachaState.objects.filter(user=self.user).update(bonus_tickets=2)
        p, _ = service.pull(self.user, self.w2.id)             # 用保留券
        self.assertEqual(p.ticket, "bonus")
        self.assertEqual(service.status(self.user)["bonus"], 1)
        with self.assertRaises(service.PullError):
            service.pull(self.user, self.empty.id)             # 沒卡片的作品不能抽

    def test_pull_many_stops_when_tickets_run_out(self):
        GachaState.objects.create(user=self.user, bonus_tickets=1)
        got = service.pull_many(self.user, self.w1.id, 10)
        self.assertEqual(len(got), 10)
        got = service.pull_many(self.user, self.w1.id, 10)    # 只剩 1 張保留券
        self.assertEqual(len(got), 1)

    def test_online_task_reward_once_per_day(self):
        from datetime import timedelta

        from django.utils import timezone as tz
        now = tz.now()
        service.heartbeat(self.user, now)                      # 第一次只開始計時
        for i in range(1, 6):
            t = service.heartbeat(self.user, now + timedelta(seconds=60 * i))
        self.assertTrue(t["claimable"])
        self.assertEqual(service.heartbeat(self.user, now + timedelta(seconds=310))["seconds"], 300)   # 太快不算
        self.assertEqual(service.claim_task(self.user), TASK_REWARD)
        with self.assertRaises(service.PullError):
            service.claim_task(self.user)                      # 一天只能領一次

    def test_online_task_ignores_long_gap(self):
        from datetime import timedelta

        from django.utils import timezone as tz
        now = tz.now()
        service.heartbeat(self.user, now)
        t = service.heartbeat(self.user, now + timedelta(minutes=30))   # 中間離開 30 分鐘不算在線
        self.assertEqual(t["seconds"], 0)

    def test_same_rarity_can_have_many_cards(self):
        w = make_work(9, "多卡作品", rarities=("N", "N", "N"))
        got = {service.pick_card(w, False, random.Random(i)).id for i in range(60)}
        self.assertEqual(len(got), 3)   # 三張 N 都抽得到

    def test_missing_rarity_falls_back(self):
        w = make_work(8, "只有 R", rarities=("R",))
        self.assertTrue(all(service.pick_card(w, False, random.Random(i)).rarity == "R" for i in range(30)))

    def test_cards_shared_within_franchise(self):
        from dramas.models import Franchise
        fr = Franchise.objects.create(name="系列")
        s1 = make_work(20, "第一季", rarities=("N",))
        s1.franchise = fr
        s1.save()
        s3 = Work.objects.create(source_id=21, title="第三季", franchise=fr)
        Follow.objects.create(user=self.user, work=s3)
        works = service.pick_works(self.user)
        self.assertEqual(works[0], (s1, True))                 # 系列只有一個卡包，有追的排前面
        p, _ = service.pull(self.user, s3.id)                  # 用第三季抽也是系列的卡
        self.assertEqual(p.card.work_id, s1.id)

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
        self.client.force_login(user)
        s = self.client.get("/gacha/api/status/").json()
        self.assertEqual([x["id"] for x in s["works"]], [w.id])
        self.assertEqual((s["pick_left"], s["random_left"], s["bonus"]), (PICK_DAILY, FREE_DAILY, 0))
        r = self.client.post("/gacha/api/pull/", {"work_id": w.id, "count": 3}).json()
        self.assertTrue(r["ok"] and r["card"]["new"])
        self.assertEqual(len(r["cards"]), 3)
        self.assertEqual(r["status"]["pick_left"], PICK_DAILY - 3)
        self.assertIn(".webp?v=", r["card"]["image"])
        album = self.client.get("/gacha/api/album/").json()
        self.assertEqual(album["works"][0]["total"], 4)   # 這部作品的所有卡都列出（沒抽到的顯示剪影）

    def test_task_claim_api(self):
        user = User.objects.create_user("cat", password="pw-123456")
        self.client.force_login(user)
        self.assertEqual(self.client.post("/gacha/api/task/claim/").status_code, 400)   # 還沒達成
        from .models import GachaDay
        GachaDay.objects.create(user=user, day=service.today(), online_seconds=300)
        r = self.client.post("/gacha/api/task/claim/").json()
        self.assertEqual(r["status"]["bonus"], TASK_REWARD)
        self.assertTrue(r["status"]["task"]["claimed"])


class UnlimitedUserTests(TestCase):
    def test_unlimited_user_can_pull_repeatedly(self):
        user = User.objects.create_user("dennis", password="pw-123456")
        w = make_work(500, "測試作品")
        Follow.objects.create(user=user, work=w)
        with override_settings(GACHA_UNLIMITED_USERS={"dennis"}):
            for _ in range(PICK_DAILY + 2):
                service.pull(user)
                service.pull(user, w.id)
            self.assertEqual(service.status(user)["pick_left"], 999)
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
            os.makedirs(os.path.join(d, "card_backs"))
            with open(os.path.join(d, "5", "SSR_abcdef12.webp"), "wb") as f:
                f.write(b"RIFFxxxxWEBP")
            with open(os.path.join(d, "card_backs", "card_back_5.webp"), "wb") as f:
                f.write(b"RIFFbackWEBP")
            with mock.patch.dict(os.environ, {"CARD_LOCAL_DIR": d}):
                url = "/gacha/img/5/SSR_abcdef12.webp"
                self.assertEqual(self.client.get(url).status_code, 302)   # 沒登入看不到
                self.client.force_login(User.objects.create_user("eve", password="pw-123456"))
                res = self.client.get(url)
                self.assertEqual(res.status_code, 200)
                self.assertEqual(res["Content-Type"], "image/webp")
                # 測試卡背面圖也可由本站代為讀取
                res_back = self.client.get("/gacha/img/card_backs/card_back_5.webp")
                self.assertEqual(res_back.status_code, 200)
                self.assertEqual(res_back.content, b"RIFFbackWEBP")
                self.assertEqual(self.client.get("/gacha/img/../../settings.py").status_code, 404)
