import json

from django.contrib.auth import get_user_model
from django.test import TestCase

from .models import Playlist, UserPrefs

User = get_user_model()


class PrefsAndPlaylistTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("amy", password="pw-123456")
        self.other = User.objects.create_user("bob", password="pw-123456")
        self.client.force_login(self.user)

    def post(self, url, data):
        return self.client.post(url, json.dumps(data), content_type="application/json")

    def test_hide_tabs(self):
        res = self.post("/api/prefs/", {"hidden_tabs": ["video", "music", "bogus"]})
        self.assertEqual(res.json()["hidden_tabs"], ["video"])   # 音樂固定顯示、未知的忽略
        self.assertEqual(UserPrefs.hidden_for(self.user), ["video"])
        html = self.client.get("/").content.decode()
        self.assertIn('data-tab="video" role="tab" hidden', html)
        self.assertNotIn('data-tab="events" role="tab" hidden', html)
        self.post("/api/prefs/", {"hidden_tabs": []})
        self.assertEqual(UserPrefs.hidden_for(self.user), [])

    def test_playlist_crud(self):
        res = self.post("/api/playlists/", {"name": "  通勤  必聽 ", "songs": ["a", "a", "b"]})
        p = res.json()["playlist"]
        self.assertEqual((p["name"], p["songs"]), ("通勤 必聽", ["a", "b"]))
        self.assertEqual(self.post("/api/playlists/", {"name": "通勤 必聽"}).status_code, 400)   # 同名
        self.assertEqual(self.post("/api/playlists/", {"name": " "}).status_code, 400)
        url = f"/api/playlists/{p['id']}/"
        self.assertEqual(self.post(url, {"add": "c"}).json()["playlist"]["songs"], ["a", "b", "c"])
        self.assertEqual(self.post(url, {"add": "a"}).json()["playlist"]["songs"], ["a", "b", "c"])   # 不重複
        self.assertEqual(self.post(url, {"remove": "b"}).json()["playlist"]["songs"], ["a", "c"])
        self.assertEqual(self.post(url, {"name": "睡前"}).json()["playlist"]["name"], "睡前")
        self.assertEqual(len(self.client.get("/api/playlists/").json()["playlists"]), 1)
        self.post(f"{url}delete/", {})
        self.assertFalse(Playlist.objects.exists())

    def test_video_playlist(self):
        a = self.post("/api/playlists/", {"name": "通勤", "songs": ["a", "b"]}).json()["playlist"]
        self.assertEqual(a["kind"], "audio")
        # 影片歌單和音樂歌單各自獨立，名稱可以相同（一鍵複製時沿用音樂歌單的名稱）
        v = self.post("/api/playlists/", {"name": "通勤", "kind": "video", "songs": ["b"]}).json()["playlist"]
        self.assertEqual((v["kind"], v["songs"]), ("video", ["b"]))
        self.assertEqual(self.post("/api/playlists/", {"name": "通勤", "kind": "video"}).status_code, 400)
        self.assertEqual(self.post("/api/playlists/", {"name": "x", "kind": "bogus"}).status_code, 400)
        # 重新複製：整份換掉
        res = self.post(f"/api/playlists/{v['id']}/", {"songs": ["a", "b", "a"]}).json()["playlist"]
        self.assertEqual(res["songs"], ["a", "b"])
        self.assertEqual(sorted(p["kind"] for p in self.client.get("/api/playlists/").json()["playlists"]), ["audio", "video"])

    def test_cannot_touch_others_playlist(self):
        p = Playlist.objects.create(user=self.other, name="bob 的歌")
        self.assertEqual(self.post(f"/api/playlists/{p.id}/", {"add": "x"}).status_code, 404)
        self.assertEqual(self.post(f"/api/playlists/{p.id}/delete/", {}).status_code, 404)
        self.assertEqual(self.client.get("/api/playlists/").json()["playlists"], [])


class EventsRefreshTests(TestCase):
    def test_force_refresh_rereads_sheet_but_not_too_often(self):
        from unittest import mock

        from player import events as ev
        ev._cache.update(data=None, timestamp=0.0, retry_at=0.0)
        with mock.patch.object(ev, "fetch_csv", return_value="") as fetch, \
                mock.patch.object(ev, "parse_events", side_effect=[[{"n": 1}], [{"n": 2}], [{"n": 3}]]):
            self.assertEqual(ev.get_events()[0], [{"n": 1}])
            self.assertEqual(ev.get_events()[0], [{"n": 1}])            # 一般讀取用快取
            self.assertEqual(ev.get_events(force=True)[0], [{"n": 1}])  # 剛讀過不到 60 秒，不重讀
            ev._cache["timestamp"] -= 61
            self.assertEqual(ev.get_events(force=True)[0], [{"n": 2}])  # 超過 60 秒，手動重新整理會重讀
            self.assertEqual(fetch.call_count, 2)
            self.assertTrue(ev.fetched_at())


class PlaylistFormatTests(TestCase):
    def test_m4a_preferred_over_mp3_and_video_kept(self):
        from player.playlist import build_playlist
        songs = build_playlist(["A.mp3", "A.m4a", "A.mp4", "B.mp3", "B.mp4", "C.m4a", "D.txt"])
        by = {s["id"]: s for s in songs}
        self.assertTrue(by["A"]["audio"].endswith("A.m4a"))
        self.assertTrue(by["A"]["video"].endswith("A.mp4"))
        self.assertTrue(by["B"]["audio"].endswith("B.mp3"))
        self.assertTrue(by["C"]["audio"].endswith("C.m4a"))
        self.assertIsNone(by["C"]["video"])
        self.assertNotIn("D", by)
        # 順序反過來也一樣用 .m4a
        self.assertTrue(build_playlist(["A.m4a", "A.mp3"])[0]["audio"].endswith("A.m4a"))


class SongAliasTests(TestCase):
    def test_removed_duplicate_resolves_to_kept_song(self):
        from player.playlist import resolve_song
        from player.views import _pl_json
        self.assertEqual(resolve_song("膽大黨2"), "膽大黨 第二季")
        self.assertEqual(resolve_song("葬送的芙莉蓮"), "葬送的芙莉蓮")
        user = User.objects.create_user("cat", password="pw-123456")
        p = Playlist.objects.create(user=user, name="x", songs=["膽大黨2", "膽大黨 第二季", "A"])
        self.assertEqual(_pl_json(p)["songs"], ["膽大黨 第二季", "A"])


class RenamedSongTests(TestCase):
    def test_renamed_song_maps_old_name_and_url(self):
        from unittest import mock

        from player import playlist as pl
        with mock.patch.object(pl, "get_playlist", return_value=[{"id": "幸運☆星 OP", "audio": pl._raw_url("幸運☆星 OP.m4a")}]):
            m = pl.alias_map()
            self.assertEqual(m["ids"]["幸運星"], "幸運☆星 OP")
            self.assertEqual(m["urls"][pl._raw_url("幸運星.m4a")], pl._raw_url("幸運☆星 OP.m4a"))
            self.assertEqual(pl.audio_urls()["幸運星"], pl._raw_url("幸運☆星 OP.m4a"))
        self.assertEqual(pl.resolve_song("幸運星"), "幸運☆星 OP")


class GuideTests(TestCase):
    """📖 功能介紹頁：要登入；截圖與影片從卡面庫讀，影片支援分段讀取（iPhone 播影片需要）"""
    def setUp(self):
        from . import views
        views._guide_cache.clear()
        self.user = get_user_model().objects.create_user("guide", password="pw-123456")

    def test_login_required(self):
        self.assertEqual(self.client.get("/guide/").status_code, 302)
        self.assertEqual(self.client.get("/guide/media/s-music.webp").status_code, 302)

    def test_page_and_media(self):
        from unittest import mock
        self.client.force_login(self.user)
        self.assertContains(self.client.get("/guide/"), "功能介紹")
        data = bytes(range(256)) * 4   # 1024 bytes
        with mock.patch("gacha.cards.read_file", return_value=data) as rf:
            r = self.client.get("/guide/media/v-music.mp4", HTTP_RANGE="bytes=10-19")
            self.assertEqual(r.status_code, 206)
            self.assertEqual(r["Content-Range"], "bytes 10-19/1024")
            self.assertEqual(r.content, data[10:20])
            r = self.client.get("/guide/media/v-music.mp4", HTTP_RANGE="bytes=-4")
            self.assertEqual(r.content, data[-4:])
            r = self.client.get("/guide/media/v-music.mp4")
            self.assertEqual((r.status_code, len(r.content), r["Accept-Ranges"]), (200, 1024, "bytes"))
            self.assertEqual(self.client.get("/guide/media/s-music.webp")["Content-Type"], "image/webp")
            rf.assert_any_call("guide/v-music.mp4")
        self.assertEqual(self.client.get("/guide/media/..%2Fsecret.webp").status_code, 404)
        self.assertEqual(self.client.get("/guide/media/x.exe").status_code, 404)


class SongMetaTests(TestCase):
    """音樂／影片清單的作品、季度、類別：看劇庫主題曲連結對應作品，類別看歌名與長度"""
    def test_annotate(self):
        from unittest import mock

        from dramas.models import Airing, Franchise, Work
        from player import songmeta
        songmeta._cache["works"] = None
        fr = Franchise.objects.create(name="測試系列")
        url = "https://raw.githubusercontent.com/x/y/main/video/"
        w = Work.objects.create(source_id=901, title="測試動畫 第二季", franchise=fr,
                                mp3_links=[{"title": "a", "url": url + "測試動畫2.mp3"}, {"title": "b", "url": url + "測試動畫1.mp3"}])
        Airing.objects.create(work=w, kind="SEASON", label="2025年7月新番", year=2025, month=7)
        Work.objects.create(source_id=902, title="另一部", mp3_links=[{"title": "c", "url": url + "另一部%20ED.mp3"}])
        meta = {"sec": {"測試動畫1": 90, "測試動畫2": 89, "另一部 ED": 240}, "work": {}, "kind": {}}
        songs = [{"id": n, "title": n, "audio": "x", "video": None} for n in ["另一部 ED", "測試動畫1", "測試動畫2", "米津玄師 - Lemon"]]
        with mock.patch.object(songmeta, "_meta", return_value=meta):
            rows = {r["id"]: r for r in songmeta.annotate(songs)}
        self.assertEqual(rows["測試動畫1"]["name"], "測試動畫 第二季 TV片頭曲 ①")   # 編號照檔名結尾數字
        self.assertEqual(rows["測試動畫2"]["label"], "TV片頭曲 ②")
        self.assertEqual(rows["測試動畫1"]["sub"], "測試系列・2025年7月新番")
        self.assertIn("2025年7月新番", rows["測試動畫1"]["tags"])
        self.assertEqual(rows["另一部 ED"]["label"], "完整ED")   # 240 秒＝完整版
        self.assertEqual(rows["米津玄師 - Lemon"]["name"], "米津玄師 - Lemon")
        self.assertNotIn("label", rows["米津玄師 - Lemon"])
        self.assertEqual(songs[1]["title"], "測試動畫1")   # 原清單不被改動
        songmeta._cache["works"] = None


class SongRequestTests(TestCase):
    """🙋 歌曲投稿：檢查欄位、只能收回自己未處理的、處理狀態看 song_meta.json、缺歌清單只在測試站"""
    def setUp(self):
        from unittest import mock
        self.user = get_user_model().objects.create_user("req", password="pw-123456")
        self.client.force_login(self.user)
        patcher = mock.patch("player.views.youtube_seconds", return_value=0)   # 測試不連 YouTube
        self.yt = patcher.start()
        self.addCleanup(patcher.stop)

    def test_video_length_limit(self):
        r = self.post(sec=601)
        self.assertEqual(r.status_code, 400)
        self.assertIn("超過 10 分鐘", r.json()["error"])
        self.assertEqual(self.post(sec=90).json()["item"]["sec"], 90)
        self.yt.return_value = 3600   # 前端讀不到長度時，伺服器自己讀
        self.assertEqual(self.post(url="https://youtu.be/zzzzzzzzzzz").status_code, 400)
        self.yt.return_value = -1     # 不存在或私人影片
        self.assertIn("不存在", self.post(url="https://youtu.be/yyyyyyyyyyy").json()["error"])

    def post(self, **kw):
        body = {"kind": "TV片頭曲", "url": "https://youtu.be/abcDEF12345", "audio": True, "video": True, "title": "自己的歌", **kw}
        return self.client.post("/api/song-requests/", json.dumps(body), content_type="application/json")

    def test_validate_and_list(self):
        from dramas.models import Work
        self.assertEqual(self.post(url="https://example.com/x").status_code, 400)
        self.assertEqual(self.post(title="").status_code, 400)
        self.assertEqual(self.post(kind="其他").status_code, 400)          # 其他要寫標籤
        self.assertEqual(self.post(audio=False, video=False).status_code, 400)
        w = Work.objects.create(source_id=991, title="測試動畫")
        r = self.post(work_id=w.id, title="")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json()["item"]["work"], "測試動畫")
        self.assertEqual(self.post(work_id=w.id).status_code, 400)        # 同一個連結不重複投稿
        self.assertEqual(self.post(kind="其他", tags="角色歌", url="https://www.youtube.com/watch?v=xyz98765432").status_code, 200)
        items = self.client.get("/api/song-requests/").json()["items"]
        self.assertEqual([x["status"] for x in items], ["pending", "pending"])

    def test_status_and_delete(self):
        from unittest import mock

        from player import songmeta
        rid = self.post().json()["item"]["id"]
        other = get_user_model().objects.create_user("other", password="pw-123456")
        self.client.force_login(other)
        self.assertEqual(self.client.post(f"/api/song-requests/{rid}/delete/").status_code, 404)   # 不能刪別人的
        self.assertEqual(len(self.client.get("/api/song-requests/?scope=all").json()["items"]), 1)
        self.client.force_login(self.user)
        meta = {"requests": {str(rid): {"status": "done", "song": "自己的歌"}}}
        with mock.patch.object(songmeta, "_meta", return_value=meta):
            item = self.client.get("/api/song-requests/").json()["items"][0]
            self.assertEqual((item["status"], item["song"]), ("done", "自己的歌"))
            self.assertEqual(self.client.post(f"/api/song-requests/{rid}/delete/").status_code, 400)   # 處理過不能刪
            self.assertEqual(self.client.get("/api/song-requests/?scope=all&pending=1").json()["items"], [])

    def test_missing_only_for_owner(self):
        from django.test import override_settings

        from dramas.models import Follow, Work
        w = Work.objects.create(source_id=991, title="缺歌動畫")
        Follow.objects.create(user=self.user, work=w)
        self.assertEqual(self.client.get("/api/song-requests/missing/").status_code, 404)   # 不是管理者帳號
        with override_settings(SONG_OWNER="req"):
            items = self.client.get("/api/song-requests/missing/").json()["items"]
            self.assertEqual([x["title"] for x in items], ["缺歌動畫"])
            self.assertIn("我的追劇缺歌", self.client.get("/").content.decode())
            self.post(work_id=w.id, title="")   # 儲存（投稿）後就不再列出
            self.assertEqual(self.client.get("/api/song-requests/missing/").json()["items"], [])

    def test_missing_skip(self):
        from django.test import override_settings

        from dramas.models import Follow, Work
        w = Work.objects.create(source_id=992, title="不想處理的動畫")
        Follow.objects.create(user=self.user, work=w)
        url = "/api/song-requests/missing/skip/"
        body = lambda d: self.client.post(url, json.dumps(d), content_type="application/json")   # noqa: E731
        self.assertEqual(body({"work_id": w.id}).status_code, 404)   # 不是管理者帳號
        with override_settings(SONG_OWNER="req"):
            self.assertTrue(body({"work_id": w.id}).json()["skipped"])
            body({"work_id": w.id})   # 重複按不會出錯
            items = self.client.get("/api/song-requests/missing/").json()["items"]
            self.assertEqual([(x["title"], x["skipped"]) for x in items], [("不想處理的動畫", True)])
            self.assertFalse(body({"work_id": w.id, "undo": True}).json()["skipped"])
            self.assertFalse(self.client.get("/api/song-requests/missing/").json()["items"][0]["skipped"])
