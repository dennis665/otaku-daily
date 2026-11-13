import random
from collections import Counter

from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings

from dramas.models import Follow, Work

from . import cards, service
from .models import CARD_PRICE, DUST_VALUE, FREE_DAILY, NEW_WORK_GIFT, PICK_DAILY, PITY_AT, PITY_NEW_AT, PITY_SR_AT, TASK_REWARD, TICKET_PRICE, Card, GachaState, OwnedCard, Pull

User = get_user_model()


def setUpModule():
    # 測試不連 GitHub 讀卡片索引
    cards._state["at"] = 1e18
    cards._state["campaigns_done"] = True   # 一次性活動另外測


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
        for i in range(1, 11):
            t = service.heartbeat(self.user, now + timedelta(seconds=30 * i))
        self.assertTrue(t["claimable"])
        self.assertEqual(service.heartbeat(self.user, now + timedelta(seconds=305))["seconds"], 300)   # 太快不算
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

    def test_sr_pity_every_10(self):
        GachaState.objects.create(user=self.user, since_sr=PITY_SR_AT - 1)
        p, _ = service.pull(self.user, self.w1.id, rng=random.Random(0))
        self.assertIn(p.rarity, {"SR", "SSR", "UR", "LR"})
        self.assertEqual(p.pity_kind, "sr")
        self.assertEqual(GachaState.objects.get(user=self.user).since_sr, 0)

    def test_new_card_pity_at_100(self):
        cards_w1 = list(Card.objects.filter(work=self.w1))
        for c in cards_w1[1:]:   # 只剩一張沒收集到
            OwnedCard.objects.create(user=self.user, card=c, work=self.w1, rarity=c.rarity)
        GachaState.objects.create(user=self.user, since_new=PITY_NEW_AT - 1)
        p, new = service.pull(self.user, self.w1.id, rng=random.Random(0))
        self.assertTrue(new)
        self.assertEqual((p.card_id, p.pity_kind), (cards_w1[0].id, "new"))
        self.assertEqual(GachaState.objects.get(user=self.user).since_new, 0)

    def test_new_card_pity_kept_when_series_complete(self):
        for c in Card.objects.filter(work=self.w1):   # 這部作品全部收集了
            OwnedCard.objects.create(user=self.user, card=c, work=self.w1, rarity=c.rarity)
        GachaState.objects.create(user=self.user, since_new=PITY_NEW_AT - 1)
        p, new = service.pull(self.user, self.w1.id, rng=random.Random(0))
        self.assertFalse(new)
        self.assertNotEqual(p.pity_kind, "new")
        self.assertEqual(GachaState.objects.get(user=self.user).since_new, PITY_NEW_AT)   # 次數保留
        p, new = service.pull(self.user, self.w2.id, rng=random.Random(0))   # 換到還有新卡的作品就觸發
        self.assertTrue(new)
        self.assertEqual(p.pity_kind, "new")
        self.assertEqual(GachaState.objects.get(user=self.user).since_new, 0)

    def test_early_hits_do_not_reset_pity_and_50th_resets_both_ssr_and_sr(self):
        state = GachaState.objects.create(user=self.user, since_sr=2, since_ssr=10, since_new=20)
        # 用固定機率先抽到一張之前沒拿過的 SSR（mock roll_rarity 直接回傳 SSR）
        from unittest import mock
        with mock.patch("gacha.service.roll_rarity", return_value="SSR"):
            p, new = service.pull(self.user, self.w1.id, rng=random.Random(0))
        self.assertEqual(p.rarity, "SSR")
        self.assertTrue(new)
        state.refresh_from_db()
        # 中途抽到 SR / SSR / 新卡都不提前歸零
        self.assertEqual((state.since_sr, state.since_ssr, state.since_new), (3, 11, 21))
        # 第 50 抽同時到 10 抽 SR 與 50 抽 SSR 保底時，兩者都要歸零
        GachaState.objects.filter(pk=state.pk).update(since_sr=PITY_SR_AT - 1, since_ssr=PITY_AT - 1)
        p50, _ = service.pull(self.user, self.w1.id, rng=random.Random(0))
        self.assertIn(p50.rarity, service.HIGH)
        state.refresh_from_db()
        self.assertEqual((state.since_sr, state.since_ssr, state.since_new), (0, 0, 22))

    def test_apply_index_creates_and_deactivates(self):
        Work.objects.create(source_id=77, title="新作品")
        Card.objects.all().delete()
        Work.objects.create(source_id=78, title="另一部")
        idx = {"works": {"77": [{"file": "77/SSR_abcdef12.webp", "rarity": "SSR", "name": "主角", "no": 3}],
                         "78": [{"file": "78/N_abcdef12.webp", "rarity": "N", "name": "路人", "no": 1},
                                {"file": "78/R_abcdef12.webp", "rarity": "R", "name": "配角", "no": 2}]}}
        created, gone = cards.apply_index(idx)
        self.assertEqual(created, 3)
        self.assertEqual(Card.objects.get(file="77/SSR_abcdef12.webp").no, 3)
        # 下架一張：整張刪除（連同卡冊）
        OwnedCard.objects.create(user=self.user, card=Card.objects.get(file="78/R_abcdef12.webp"), work_id=Card.objects.get(file="78/R_abcdef12.webp").work_id, rarity="R")
        idx["works"]["78"].pop()
        cards.apply_index(idx)
        self.assertFalse(Card.objects.filter(file="78/R_abcdef12.webp").exists())
        self.assertFalse(OwnedCard.objects.exists())
        # 讀到幾乎空的索引（可能壞掉）：只停用不刪除
        cards.apply_index({"works": {}})
        self.assertEqual(Card.objects.count(), 2)
        self.assertFalse(Card.objects.filter(active=True).exists())


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


class StardustTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("dust", password="pw-123456")
        self.w = make_work(900, "星塵作品")
        self.n = Card.objects.get(work=self.w, rarity="N")
        self.sr = Card.objects.get(work=self.w, rarity="SR")

    def own(self, card, count):
        return OwnedCard.objects.create(user=self.user, card=card, work=self.w, rarity=card.rarity, count=count)

    def test_only_duplicates_can_be_dismantled(self):
        self.own(self.n, 1)
        with self.assertRaises(service.PullError):
            service.dismantle(self.user, self.n.id, 1)          # 只有 1 張不能分解
        o = self.own(self.sr, 3)
        gain, cnt = service.dismantle(self.user, self.sr.id, 5)  # 最多分解到剩 1 張
        self.assertEqual((gain, cnt), (DUST_VALUE["SR"] * 2, 2))
        o.refresh_from_db()
        self.assertEqual(o.count, 1)
        self.assertEqual(GachaState.objects.get(user=self.user).stardust, DUST_VALUE["SR"] * 2)

    def test_dismantle_all_keeps_one_each(self):
        self.own(self.n, 4)
        self.own(self.sr, 2)
        gain, cnt = service.dismantle(self.user)
        self.assertEqual(cnt, 4)
        self.assertEqual(gain, DUST_VALUE["N"] * 3 + DUST_VALUE["SR"])
        self.assertTrue(all(o.count == 1 for o in OwnedCard.objects.filter(user=self.user)))

    def test_shop_tickets_and_card(self):
        GachaState.objects.create(user=self.user, stardust=TICKET_PRICE * 2 + CARD_PRICE["SR"])
        service.buy_tickets(self.user, 2)
        service.buy_card(self.user, self.sr.id)
        st = GachaState.objects.get(user=self.user)
        self.assertEqual((st.stardust, st.bonus_tickets), (0, 2))
        with self.assertRaises(service.PullError):
            service.buy_card(self.user, self.sr.id)             # 已經有了
        with self.assertRaises(service.PullError):
            service.buy_tickets(self.user, 1)                   # 星塵不夠

    def test_removed_cards_refund_stardust(self):
        self.own(self.n, 2)
        self.own(self.sr, 1)
        Card.objects.filter(work=self.w).update(file="x")       # 讓檔名不同，模擬已有的卡
        for i, c in enumerate(Card.objects.filter(work=self.w)):
            c.file = f"900/{c.rarity}_abcdef{i:02d}.webp"
            c.save()
        keep = [{"file": c.file, "rarity": c.rarity, "name": "", "no": i + 1}
                for i, c in enumerate(Card.objects.filter(work=self.w).exclude(id__in=[self.n.id, self.sr.id]))]
        cards.apply_index({"works": {"900": keep}})
        st = GachaState.objects.get(user=self.user)
        self.assertEqual(st.stardust, DUST_VALUE["N"] * 2 + DUST_VALUE["SR"])
        self.assertIn("退還", st.notice)
        s = service.status(self.user)
        self.assertIn("退還", s["notice"])
        self.assertEqual(service.status(self.user)["notice"], "")   # 只顯示一次


class NewWorkGiftTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("gift", password="pw-123456")
        self.w = make_work(950, "舊作品")
        self.old = [{"file": c.file, "rarity": c.rarity, "name": "", "no": i + 1}
                    for i, c in enumerate(Card.objects.filter(work=self.w))]
        Work.objects.create(source_id=951, title="新作品")

    def sync(self, new_cards=()):
        cards.apply_index({"works": {"950": self.old, "951": list(new_cards)}})
        return GachaState.objects.get_or_create(user=self.user)[0]

    def test_new_work_gives_tickets_once(self):
        st = self.sync()                                        # 第一次：舊作品記成已送過，不發
        self.assertEqual(st.bonus_tickets, 0)
        new = [{"file": "951/N_abcdef01.webp", "rarity": "N", "name": "a", "no": 1}]
        st = self.sync(new)
        self.assertEqual(st.bonus_tickets, NEW_WORK_GIFT)
        self.assertIn("新作品", st.notice)
        new.append({"file": "951/R_abcdef02.webp", "rarity": "R", "name": "b", "no": 2})
        st = self.sync(new)                                     # 同一部再加卡不重複送
        self.assertEqual(st.bonus_tickets, NEW_WORK_GIFT)

    def test_fresh_database_gives_nothing(self):
        Card.objects.all().delete()
        st = self.sync([{"file": "951/N_abcdef01.webp", "rarity": "N", "name": "a", "no": 1}])
        self.assertEqual(st.bonus_tickets, 0)



class ExtrasTests(TestCase):
    """🏆 組合羈絆、🏅 收集稱號、⭐ 展示櫃、🎵 聽歌猜作品"""
    def setUp(self):
        from . import extras
        self.extras = extras
        self.user = User.objects.create_user("fan", password="pw-123456")
        self.w = Work.objects.create(source_id=970, title="兄弟作品")
        self.c = {n: Card.objects.create(work=self.w, rarity="N", file=f"970/N_{i:02d}abcdef.webp", name=f"{n} 便服", no=i + 1)
                  for i, n in enumerate(["一郎", "二郎", "三郎", "路人"])}
        cards._state["combos"] = {"970": [{"name": "三兄弟", "chars": ["一郎", "二郎", "三郎"]}]}
        cards._state["titles"] = {"970": {"50": "見習兄弟", "100": "兄弟全制霸"}}

    def tearDown(self):
        cards._state.pop("combos", None)
        cards._state.pop("titles", None)

    def own(self, *names):
        for n in names:
            OwnedCard.objects.create(user=self.user, card=self.c[n], work=self.w, rarity="N")

    def test_combo_reward_once_and_titles(self):
        from .models import COMBO_DUST_PER_MEMBER
        self.own("一郎", "二郎")
        s = service.status(self.user)
        self.assertEqual(s["stardust"], 0)
        self.assertEqual(s["title"], "見習兄弟")                 # 收集 50% 解鎖並自動顯示第一個稱號
        self.own("三郎")
        s = service.status(self.user)
        self.assertEqual(s["stardust"], COMBO_DUST_PER_MEMBER * 3)
        self.assertIn("三兄弟", s["notice"])
        service.status(self.user)
        self.assertEqual(GachaState.objects.get(user=self.user).stardust, COMBO_DUST_PER_MEMBER * 3)   # 只送一次
        self.client.force_login(self.user)
        res = self.client.get("/gacha/api/achievements/")
        combo = res.json()["combos"][0]
        self.assertTrue(combo["done"] and combo["claimed"])
        with self.assertRaises(self.extras.ExtraError):
            self.extras.set_title(self.user, "兄弟全制霸")         # 還沒 100%

    def test_showcase_limit_and_owned_only(self):
        self.own("一郎", "二郎", "三郎", "路人")
        with self.assertRaises(self.extras.ExtraError):
            self.extras.toggle_showcase(self.user, 999999)
        for n in ["一郎", "二郎", "三郎"]:
            self.assertTrue(self.extras.toggle_showcase(self.user, self.c[n].id))
        with self.assertRaises(self.extras.ExtraError):
            self.extras.toggle_showcase(self.user, self.c["路人"].id)
        self.assertFalse(self.extras.toggle_showcase(self.user, self.c["一郎"].id))   # 再按一次拿出來
        self.assertEqual(len(self.extras.showcase_cards(self.user)), 2)

    def test_quiz_flow(self):
        from unittest import mock
        from .models import QUIZ_DAILY, QUIZ_REWARD
        pool = {f"作品{i}": [f"https://example.com/{i}.m4a"] for i in "ABCDEF"}
        day = service.today()
        with mock.patch.object(self.extras, "quiz_pool", return_value=pool):
            q = self.extras.quiz_next(self.user, day)
            self.assertEqual(self.extras.quiz_next(self.user, day).id, q.id)   # 沒回答前同一題
            self.assertEqual(len(q.options), 4)
            self.assertIn(q.answer, q.options)
            _, gain = self.extras.quiz_answer(self.user, q.id, q.answer)
            self.assertEqual(gain, QUIZ_REWARD)
            with self.assertRaises(self.extras.ExtraError):
                self.extras.quiz_answer(self.user, q.id, q.answer)           # 不能重複回答
            for _ in range(QUIZ_DAILY - 1):
                q = self.extras.quiz_next(self.user, day)
                wrong = next(o for o in q.options if o != q.answer)
                self.assertEqual(self.extras.quiz_answer(self.user, q.id, wrong)[1], 0)
            with self.assertRaises(self.extras.ExtraError):
                self.extras.quiz_next(self.user, day)                         # 今天答完了
        self.assertEqual(GachaState.objects.get(user=self.user).stardust, QUIZ_REWARD)

    def test_new_work_sends_push(self):
        from unittest import mock
        old = [{"file": c.file, "rarity": "N", "name": c.name, "no": c.no} for c in self.c.values()]
        Work.objects.create(source_id=971, title="新番")
        cards.apply_index({"works": {"970": old}})
        with mock.patch("notifications.push.send_to_users") as send:
            cards.apply_index({"works": {"970": old, "971": [{"file": "971/N_abcdef01.webp", "rarity": "N", "name": "x", "no": 1}]}})
        send.assert_called_once()
        self.assertIn("新番", send.call_args[0][2])

    def test_quote_quiz(self):
        day = service.today()
        q = self.extras.quiz_next(self.user, day, kind="quote")
        self.assertEqual(q.kind, "quote")
        self.assertTrue(q.prompt)
        self.assertEqual(len(set(q.options)), 4)
        self.assertIn(q.answer, q.options)
        self.assertEqual(self.extras.quiz_next(self.user, day, kind="quote").id, q.id)
        self.client.force_login(self.user)
        res = self.client.post("/gacha/api/quiz/answer/", {"id": q.id, "pick": q.answer}).json()
        self.assertTrue(res["correct"])
        self.assertEqual(res["kind"], "quote")
        self.assertEqual(res["left"], 2)

    def test_quiz_history_today(self):
        self.client.force_login(self.user)
        q = self.extras.quiz_next(self.user, service.today(), kind="quote")
        wrong = next(o for o in q.options if o != q.answer)
        res = self.client.post("/gacha/api/quiz/answer/", {"id": q.id, "pick": wrong}).json()
        h = res["history"][0]
        self.assertEqual((h["picked"], h["answer"], h["correct"]), (wrong, q.answer, False))
        self.assertEqual(h["prompt"], q.prompt)
        self.assertEqual(len(self.client.get("/gacha/api/quiz/?kind=quote").json()["history"]), 1)

    def test_campaign_once_with_push(self):
        from unittest import mock
        other = User.objects.create_user("other", password="pw-123456")
        cards._state["campaigns_done"] = False
        try:
            with mock.patch("notifications.push.send_to_users") as send:
                self.assertEqual(cards.run_campaigns(), [c["key"] for c in cards.CAMPAIGNS])
                cards._state["campaigns_done"] = False
                self.assertEqual(cards.run_campaigns(), [])          # 同一個活動不會再發
            send.assert_called_once()
            total = sum(c["tickets"] for c in cards.CAMPAIGNS)
            for u in (self.user, other):
                st = GachaState.objects.get(user=u)
                self.assertEqual(st.bonus_tickets, total)
                self.assertIn("自選抽卡券", st.notice)
        finally:
            cards._state["campaigns_done"] = True
