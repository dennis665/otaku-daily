from django.urls import path

from . import views

app_name = "player"

urlpatterns = [
    path("", views.home, name="home"),
    path("api/events/", views.events_api, name="events_api"),
]
