from django.urls import path

from . import views

app_name = "dramas"

urlpatterns = [
    path("api/mine/", views.mine, name="mine"),
    path("api/works/", views.works, name="works"),
    path("api/filters/", views.filters, name="filters"),
    path("api/works/<int:pk>/follow/", views.follow, name="follow"),
    path("one-time-migrate/", views.one_time_migrate, name="one_time_migrate"),   # 一次性，搬完移除
]
