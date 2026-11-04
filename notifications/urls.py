from django.urls import path

from . import views

app_name = "notifications"

urlpatterns = [
    path("api/status/", views.status, name="status"),
    path("api/subscribe/", views.subscribe, name="subscribe"),
    path("api/unsubscribe/", views.unsubscribe, name="unsubscribe"),
    path("api/test/", views.test, name="test"),
    path("tick/", views.tick, name="tick"),
]
