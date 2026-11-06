from django.contrib import admin

from .models import Playlist, UserPrefs


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "updated_at")
    search_fields = ("name", "user__username")


@admin.register(UserPrefs)
class UserPrefsAdmin(admin.ModelAdmin):
    list_display = ("user", "hidden_tabs")
