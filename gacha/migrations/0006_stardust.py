from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("gacha", "0005_card_no_and_cleanup")]
    operations = [
        migrations.AddField(model_name="gachastate", name="stardust", field=models.PositiveIntegerField(default=0, verbose_name="星塵")),
        migrations.AddField(model_name="gachastate", name="notice", field=models.CharField(blank=True, max_length=200, verbose_name="要告訴使用者的訊息（顯示一次）")),
    ]
