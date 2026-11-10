"""把 2026-11-10 匯入影音庫的歌連到追劇庫的作品（主題曲）；作品以 youranimes 編號對應，已連過的不重複加"""
import urllib.parse

from django.db import migrations

RAW = "https://raw.githubusercontent.com/dennis665/fenglan-media-assets/main/video/"

LINKS = {
    4199: "催眠麥克風 Division Battle Anthem+",   # 催眠麥克風 Rhyme Anima +（OP）
    6261: "とた - オリーブ",                       # 致遙不可及彼方的你（劇場版）
    2429: "幻想魔傳 最遊記",                       # 幻想魔傳 最遊記（OP「FOR REAL」）
    6513: "幸運星",                                # 幸運☆星（OP）
}


def link(apps, schema_editor):
    Work = apps.get_model("dramas", "Work")
    for source_id, name in LINKS.items():
        w = Work.objects.filter(source_id=source_id).first()
        if not w:
            continue
        url = RAW + urllib.parse.quote(f"{name}.m4a")
        links = list(w.mp3_links or [])
        if any(urllib.parse.unquote(l.get("url", "")).rsplit("/", 1)[-1].rsplit(".", 1)[0] == name for l in links):
            continue
        links.append({"title": name, "url": url})
        w.mp3_links = links
        w.save(update_fields=["mp3_links"])


class Migration(migrations.Migration):
    dependencies = [("dramas", "0002_sync_log")]
    operations = [migrations.RunPython(link, migrations.RunPython.noop)]
