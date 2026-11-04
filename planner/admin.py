from django.contrib import admin

from .models import Group, GroupMember, Itinerary


class MemberInline(admin.TabularInline):
    model = GroupMember
    extra = 0


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by", "created_at")
    inlines = [MemberInline]


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ("title", "activity_type", "date_time", "group", "creator")
    list_filter = ("activity_type", "group")
    search_fields = ("title", "location")
