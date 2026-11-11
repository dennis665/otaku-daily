"""卡片加卡號；刪除已下架（抽不到）的卡與沒有圖的舊卡，連同抽卡紀錄與卡冊裡的這些卡（使用者要求 2026-11-11）"""
from django.db import migrations, models


def cleanup(apps, schema_editor):
    Card = apps.get_model("gacha", "Card")
    Card.objects.filter(models.Q(active=False) | models.Q(file="")).delete()


class Migration(migrations.Migration):
    dependencies = [("gacha", "0004_tickets_and_tasks")]
    operations = [
        migrations.AddField(model_name="card", name="no", field=models.PositiveIntegerField(default=0, verbose_name="卡號（同作品內編號）")),
        migrations.AlterModelOptions(name="card", options={"ordering": ["work_id", "no", "id"], "verbose_name": "卡片", "verbose_name_plural": "卡片"}),
        migrations.RunPython(cleanup, migrations.RunPython.noop),
    ]
