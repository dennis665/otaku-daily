from django.urls import path

from . import views

app_name = "player"

urlpatterns = [
    path("", views.home, name="home"),
    path("api/events/", views.events_api, name="events_api"),
    path("api/prefs/", views.prefs, name="prefs"),
    path("api/playlists/", views.playlists, name="playlists"),
    path("api/playlists/<int:pk>/", views.playlist_update, name="playlist_update"),
    path("api/playlists/<int:pk>/delete/", views.playlist_delete, name="playlist_delete"),
]
