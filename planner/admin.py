from django.contrib import admin

from .models import Group, GroupInvitation, GroupMember, Itinerary


class MemberInline(admin.TabularInline):
    model = GroupMember
    extra = 0


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by", "created_at")
    inlines = [MemberInline]


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ("title", "activity_type", "date_time", "creator")
    list_filter = ("activity_type", "groups")
    search_fields = ("title", "location")


@admin.register(GroupInvitation)
class GroupInvitationAdmin(admin.ModelAdmin):
    list_display = ("group", "invitee", "inviter", "created_at")
