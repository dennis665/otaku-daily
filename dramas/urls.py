from django.urls import path

from . import views

app_name = "dramas"

urlpatterns = [
    path("api/mine/", views.mine, name="mine"),
    path("api/works/", views.works, name="works"),
    path("api/filters/", views.filters, name="filters"),
    path("api/works/<int:pk>/follow/", views.follow, name="follow"),
    path("api/sync/", views.sync, name="sync"),   # 每日抓新番（GitHub 排程，密碼保護）
]
