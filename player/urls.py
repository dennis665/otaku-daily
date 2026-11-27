from django.urls import path

from . import views

app_name = "player"

urlpatterns = [
    path("", views.home, name="home"),
    path("guide/", views.guide, name="guide"),
    path("ai/city/", views.city3d, name="city3d"),
    path("guide/media/<str:name>", views.guide_media, name="guide_media"),
    path("api/events/", views.events_api, name="events_api"),
    path("api/song-requests/", views.song_requests, name="song_requests"),
    path("api/song-requests/missing/", views.song_request_missing, name="song_request_missing"),
    path("api/song-requests/missing/skip/", views.song_request_skip, name="song_request_skip"),
    path("api/song-requests/<int:pk>/delete/", views.song_request_delete, name="song_request_delete"),
    path("api/prefs/", views.prefs, name="prefs"),
    path("api/playlists/", views.playlists, name="playlists"),
    path("api/playlists/<int:pk>/", views.playlist_update, name="playlist_update"),
    path("api/playlists/<int:pk>/delete/", views.playlist_delete, name="playlist_delete"),
]
