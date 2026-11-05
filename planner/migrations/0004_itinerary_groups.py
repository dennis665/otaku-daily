"""行程改成可以分享到多個群組：新增 groups（多對多），把原本的 group 搬過去後移除 group"""
from django.db import migrations, models


def copy_group(apps, schema_editor):
    Itinerary = apps.get_model("planner", "Itinerary")
    for it in Itinerary.objects.exclude(group__isnull=True):
        it.groups.add(it.group_id)


def copy_back(apps, schema_editor):
    Itinerary = apps.get_model("planner", "Itinerary")
    for it in Itinerary.objects.all():
        first = it.groups.first()
        if first:
            it.group_id = first.pk
            it.save(update_fields=["group"])


class Migration(migrations.Migration):
    dependencies = [("planner", "0003_staging_remove_dennis")]

    operations = [
        migrations.AddField(
            model_name="itinerary",
            name="groups",
            field=models.ManyToManyField(blank=True, related_name="shared_itineraries", to="planner.group", verbose_name="群組"),
        ),
        migrations.RunPython(copy_group, copy_back),
        migrations.RemoveField(model_name="itinerary", name="group"),
    ]
