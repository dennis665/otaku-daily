from django.urls import path

from . import views

app_name = "gacha"

urlpatterns = [
    path("api/status/", views.status, name="status"),
    path("api/pull/", views.pull, name="pull"),
    path("api/heartbeat/", views.heartbeat, name="heartbeat"),
    path("api/task/claim/", views.claim_task, name="claim_task"),
    path("api/album/", views.album, name="album"),
    path("api/dismantle/", views.dismantle, name="dismantle"),
    path("api/shop/", views.shop, name="shop"),
    path("api/achievements/", views.achievements, name="achievements"),
    path("api/title/", views.set_title, name="set_title"),
    path("api/showcase/", views.showcase, name="showcase"),
    path("api/quiz/", views.quiz, name="quiz"),
    path("api/quiz/next/", views.quiz_next, name="quiz_next"),
    path("api/quiz/answer/", views.quiz_answer, name="quiz_answer"),
    path("img/<path:file>", views.image, name="image"),
]
