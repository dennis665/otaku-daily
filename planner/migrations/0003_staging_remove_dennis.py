"""
一次性：測試站刪除登入有問題的 dennis 帳號（使用者要求，2026-11-04），讓他重新註冊。
只在 APP_ENV=staging 時執行；正式站與本機套用時什麼都不做。
"""
from django.conf import settings
from django.db import migrations


def remove_staging_dennis(apps, schema_editor):
    if settings.APP_ENV != "staging":
        return
    User = apps.get_model("auth", "User")
    User.objects.filter(username="dennis").delete()   # 相關的群組成員、邀請、行程、推播訂閱一起刪除


class Migration(migrations.Migration):
    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
        ("admin", "0003_logentry_add_action_flag_choices"),
        ("planner", "0002_group_invitation"),
        ("notifications", "0001_initial"),
    ]

    operations = [migrations.RunPython(remove_staging_dennis, migrations.RunPython.noop)]
