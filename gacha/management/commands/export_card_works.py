"""匯出作品清單（編號、名稱、別名）給影音庫的 card_import.py 對照資料夾名稱用"""
import json

from django.core.management.base import BaseCommand

from dramas.models import Work


class Command(BaseCommand):
    help = "匯出作品清單給卡面匯入工具"

    def add_arguments(self, parser):
        parser.add_argument("path")

    def handle(self, path, **opts):
        data = [{"source_id": w.source_id, "title": w.title, "alt_titles": w.alt_titles}
                for w in Work.objects.exclude(source_id=None).only("source_id", "title", "alt_titles")]
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False)
        self.stdout.write(f"已匯出 {len(data)} 部作品到 {path}")
