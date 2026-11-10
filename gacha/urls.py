from django.urls import path

from . import views

app_name = "gacha"

urlpatterns = [
    path("api/status/", views.status, name="status"),
    path("api/pull/", views.pull, name="pull"),
    path("api/album/", views.album, name="album"),
]
