from django.contrib import admin

from .models import GachaState, OwnedCard, Pull

admin.site.register(Pull, list_display=("user", "work", "rarity", "pool", "day", "pity"), list_filter=("rarity", "pool", "day"))
admin.site.register(OwnedCard, list_display=("user", "work", "rarity", "count", "last_at"), list_filter=("rarity",))
admin.site.register(GachaState, list_display=("user", "total", "since_ssr"))
