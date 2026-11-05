from django.contrib import admin

from .models import Airing, Franchise, Work


class AiringInline(admin.TabularInline):
    model = Airing
    extra = 0


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = ("title", "media_type", "franchise", "sort_key", "source_id")
    search_fields = ("title", "search_text")
    list_filter = ("media_type",)
    inlines = [AiringInline]
    autocomplete_fields = ("franchise",)


@admin.register(Franchise)
class FranchiseAdmin(admin.ModelAdmin):
    search_fields = ("name",)
