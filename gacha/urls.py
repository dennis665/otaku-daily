from django.urls import path

from . import views

app_name = "gacha"

urlpatterns = [
    path("api/status/", views.status, name="status"),
    path("api/pull/", views.pull, name="pull"),
    path("api/heartbeat/", views.heartbeat, name="heartbeat"),
    path("api/task/claim/", views.claim_task, name="claim_task"),
    path("api/album/", views.album, name="album"),
    path("img/<path:file>", views.image, name="image"),
]
