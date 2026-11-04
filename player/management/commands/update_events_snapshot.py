import json

from django.core.management.base import BaseCommand

from player.events import SNAPSHOT_PATH, fetch_csv, parse_events


class Command(BaseCommand):
    help = "從 Google 試算表重新下載北部動漫活動，更新專案內的備份 (player/data/events_snapshot.json)"

    def handle(self, *args, **options):
        events = parse_events(fetch_csv())
        SNAPSHOT_PATH.write_text(json.dumps(events, ensure_ascii=False, indent=1), encoding="utf-8")
        self.stdout.write(self.style.SUCCESS(f"已更新活動備份：{len(events)} 筆"))
