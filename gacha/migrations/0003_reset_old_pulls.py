"""清空卡面還沒有圖片時期的抽卡資料（使用者要求 2026-11-11）：抽卡紀錄、卡冊、保底計數、沒有圖的舊卡"""
from django.db import migrations


def reset(apps, schema_editor):
    for name in ("OwnedCard", "Pull", "GachaState"):
        apps.get_model("gacha", name).objects.all().delete()
    apps.get_model("gacha", "Card").objects.filter(file="").delete()


class Migration(migrations.Migration):
    dependencies = [("gacha", "0002_cards")]
    operations = [migrations.RunPython(reset, migrations.RunPython.noop)]
