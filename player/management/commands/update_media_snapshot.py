import json

from django.core.management.base import BaseCommand, CommandError

from player.playlist import SNAPSHOT_PATH, build_playlist, fetch_file_names


class Command(BaseCommand):
    help = "從 GitHub 影音儲存庫重新抓取檔名，更新備援用的快照 player/data/media_files.json"

    def handle(self, *args, **options):
        try:
            names = sorted(fetch_file_names())
        except Exception as exc:
            raise CommandError(f"讀取 GitHub 失敗：{exc}") from exc
        SNAPSHOT_PATH.parent.mkdir(parents=True, exist_ok=True)
        SNAPSHOT_PATH.write_text(json.dumps(names, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
        self.stdout.write(self.style.SUCCESS(f"已更新快照：{len(names)} 個檔案，{len(build_playlist(names))} 首"))
