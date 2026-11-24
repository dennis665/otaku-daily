from django.urls import path

from . import views

app_name = "transfer"

urlpatterns = [
    path("api/poll/", views.poll, name="poll"),
    path("api/send/", views.send, name="send"),
    path("api/rename/", views.rename, name="rename"),
    path("api/devices/<int:pk>/remove/", views.remove_device, name="remove_device"),
    path("api/<uuid:pk>/", views.detail, name="detail"),
    path("api/<uuid:pk>/answer/", views.answer, name="answer"),
    path("api/<uuid:pk>/status/", views.set_status, name="status"),
]
