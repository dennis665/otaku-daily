import json
from datetime import date

from django.contrib.auth.models import User
from django.test import TestCase

from .models import Airing, Follow, Work
from .sync import choose_title, set_images, upsert_works


class SyncRuleTests(TestCase):
    def test_choose_title(self):
        self.assertEqual(choose_title("恐怖コレクター", "恐怖收集者"), "恐怖收集者")       # 日文 → 中文：換
        self.assertEqual(choose_title("恐怖收集者", "恐怖コレクター"), "恐怖收集者")       # 中文 → 日文：不換
        self.assertEqual(choose_title("鐵旅！meet with 鐵道娘", "鐵旅！meet with 鐵道少女"), "鐵旅！meet with 鐵道少女")   # 譯名更新
        self.assertEqual(choose_title("10 Count", "Count"), "10 Count")                     # 被截掉開頭數字：不換

    def test_same_source_id_is_one_work_and_nothing_deleted(self):
        upsert_works([{"source_id": 1, "title": "劇場版 吉伊卡哇", "airings": ["2026年日版動畫電影"], "media_type": "MOVIE"}])
        upsert_works([{"source_id": 1, "title": "劇場版 吉伊卡哇", "airings": ["2026年台版動畫電影"]},
                      {"source_id": 2, "title": "新作", "airings": ["2027年1月新番"]}])
        self.assertEqual(Work.objects.count(), 2)
        w = Work.objects.get(source_id=1)
        self.assertEqual(sorted(w.airings.values_list("label", flat=True)), ["2026年台版動畫電影", "2026年日版動畫電影"])
        # 之後的抓取沒出現 1 號：不刪除
        upsert_works([{"source_id": 2, "title": "新作", "airings": ["2027年1月新番"]}])
        self.assertTrue(Work.objects.filter(source_id=1).exists())

    def test_rename_keeps_alias_and_announced_then_aired(self):
        upsert_works([{"source_id": 5, "title": "転生ゴブリンだけど質問ある？", "airings": ["動畫化決定"]}])
        upsert_works([{"source_id": 5, "title": "轉生哥布林有問題嗎？", "airings": ["2027年1月新番"]}])
        w = Work.objects.get(source_id=5)
        self.assertEqual(w.title, "轉生哥布林有問題嗎？")
        self.assertIn("転生ゴブリンだけど質問ある？", w.alt_titles)
        self.assertEqual(w.airings.count(), 2)
        self.assertEqual(w.sort_key, "202701")   # 已經有實際播出季度，就以播出季度排序（不再當成「動畫化決定」）
        upsert_works([{"source_id": 6, "title": "只公布動畫化", "airings": ["動畫化決定"]}])
        self.assertEqual(Work.objects.get(source_id=6).sort_key, "999999")   # 還沒播出的才排最前面

    def test_new_work_first_seen_franchise_and_images(self):
        upsert_works([{"source_id": 9, "title": "葬送的芙莉蓮", "airings": ["2023年10月新番"]}], mode="migrate")
        self.assertIsNone(Work.objects.get(source_id=9).first_seen)        # 搬家的舊資料不算 NEW
        stats = upsert_works([{"source_id": 10, "title": "葬送的芙莉蓮 第二季", "airings": ["2026年1月新番"]}])
        w = Work.objects.get(source_id=10)
        self.assertEqual(w.first_seen, date.today())
        self.assertEqual(stats["need_images"], [10])
        self.assertEqual(set_images({"10": ["https://img.example/a.webp"]}), 1)
        self.assertEqual(set_images({"10": ["https://img.example/b.webp"]}), 0)   # 已有封面不覆蓋
        self.assertIsNotNone(w.franchise)


class ApiTests(TestCase):
    def setUp(self):
        self.u = User.objects.create_user("dennis", password="pw-dennis-123")
        self.client.force_login(self.u)
        upsert_works([
            {"source_id": 1, "title": "恐怖收集者", "alt_titles": ["恐怖コレクター"], "airings": ["2023年7月新番"], "media_type": "TV"},
            {"source_id": 2, "title": "海豹小白", "airings": ["2017年7月新番"], "media_type": "TV"},
            {"source_id": 3, "title": "海豹小白", "airings": ["2026年10月新番"], "media_type": "TV"},
        ], mode="migrate")

    def get(self, url):
        return self.client.get(url, secure=True).json()

    def test_search_alias_and_label_filter(self):
        self.assertEqual([w["title"] for w in self.get("/dramas/api/works/?q=コレクター")["items"]], ["恐怖收集者"])
        items = self.get("/dramas/api/works/?label=2026年10月新番")["items"]
        self.assertEqual([w["title"] for w in items], ["海豹小白（2026）"])   # 同名不同作品：加年份

    def test_follow_toggle_and_mine(self):
        wid = Work.objects.get(source_id=1).id
        r = self.client.post(f"/dramas/api/works/{wid}/follow/", secure=True).json()
        self.assertTrue(r["followed"])
        mine = self.get("/dramas/api/mine/")
        self.assertEqual((mine["total"], mine["items"][0]["title"]), (1, "恐怖收集者"))
        self.client.post(f"/dramas/api/works/{wid}/follow/", secure=True)
        self.assertEqual(self.get("/dramas/api/mine/")["total"], 0)

    def test_filters(self):
        f = self.get("/dramas/api/filters/")
        self.assertEqual([s["label"] for s in f["seasons"]], ["2026年10月新番", "2023年7月新番", "2017年7月新番"])

    def test_requires_login(self):
        self.client.logout()
        self.assertEqual(self.client.get("/dramas/api/mine/", secure=True).status_code, 302)
