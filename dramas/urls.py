from django.urls import path

from . import views

app_name = "dramas"

urlpatterns = [
    path("api/mine/", views.mine, name="mine"),
    path("api/works/", views.works, name="works"),
    path("api/filters/", views.filters, name="filters"),
    path("api/works/<int:pk>/follow/", views.follow, name="follow"),
]
