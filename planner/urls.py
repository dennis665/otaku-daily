from django.urls import path

from . import views

app_name = "planner"

urlpatterns = [
    path("api/itineraries/", views.itineraries, name="itineraries"),
    path("api/itineraries/<int:pk>/", views.itinerary_update, name="itinerary_update"),
    path("api/itineraries/<int:pk>/delete/", views.itinerary_delete, name="itinerary_delete"),
    path("api/itineraries/<int:pk>/finalize/", views.itinerary_finalize, name="itinerary_finalize"),
    path("api/itineraries/<int:pk>/hide/", views.itinerary_hide, name="itinerary_hide"),
    path("api/groups/", views.groups, name="groups"),
    path("api/groups/<int:pk>/leave/", views.group_leave, name="group_leave"),
    path("api/groups/<int:pk>/invite/", views.group_invite, name="group_invite"),
    path("api/users/search/", views.search_users, name="search_users"),
    path("api/invitations/<int:pk>/accept/", views.invitation_accept, name="invitation_accept"),
    path("api/invitations/<int:pk>/decline/", views.invitation_decline, name="invitation_decline"),
    path("import/", views.import_itineraries, name="import"),
    path("one-time-import/", views.one_time_import, name="one_time_import"),   # 一次性，匯入後移除
    path("join/<str:code>/", views.join_group, name="join"),
    path("i/<str:token>/", views.share, name="share"),
]
