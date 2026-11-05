"""
一次性：清除正式站資料庫裡的測試資料（2026-11-05）。
原因：測試站曾誤接正式站的資料庫，在測試站做的測試（quick_tester 帳號、「Claude 測試群」與兩筆測試行程）留在正式站。
只在 APP_ENV=production 執行；測試站與本機套用時什麼都不做。
dennis、「瘋遊群」、劇庫與追劇清單都不會動。
"""
from django.conf import settings
from django.db import migrations


def remove_test_data(apps, schema_editor):
    if settings.APP_ENV != "production":
        return
    User = apps.get_model("auth", "User")
    Group = apps.get_model("planner", "Group")
    Itinerary = apps.get_model("planner", "Itinerary")
    tester = User.objects.filter(username="quick_tester").first()
    if tester:
        Itinerary.objects.filter(creator=tester).delete()   # 「推播測試：吃晚餐」「⏰ 提醒測試」
        tester.delete()                                     # 連同群組成員、邀請、推播訂閱、追劇紀錄
    Group.objects.filter(name="Claude 測試群").delete()


class Migration(migrations.Migration):
    dependencies = [
        ("planner", "0004_itinerary_groups"),
        ("notifications", "0001_initial"),
        ("dramas", "0001_initial"),
        ("admin", "0003_logentry_add_action_flag_choices"),
    ]

    operations = [migrations.RunPython(remove_test_data, migrations.RunPython.noop)]
