from django.contrib import admin

from .models import Device, Transfer


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "platform", "last_seen")
    list_filter = ("platform",)


@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    list_display = ("id", "sender", "from_device", "to_device", "status", "total_size", "created_at")
    list_filter = ("status",)
    exclude = ("offer", "answer")
