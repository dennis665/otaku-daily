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
