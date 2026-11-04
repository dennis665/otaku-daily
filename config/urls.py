from django.contrib import admin
from django.urls import include, path

from player import views as player_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    # PWA 必須從網站根目錄提供 service worker 與 manifest，才能涵蓋整個網站
    path("sw.js", player_views.service_worker, name="service_worker"),
    path("manifest.webmanifest", player_views.manifest, name="manifest"),
    path("", include("player.urls")),
]
