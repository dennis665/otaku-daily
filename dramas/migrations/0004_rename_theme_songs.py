"""主題曲依命名規則改名（動畫作品中文名＋OP／主題曲）：追劇庫裡的連結與顯示名稱一起換成新名稱"""
import urllib.parse

from django.db import migrations

RAW = "https://raw.githubusercontent.com/dennis665/fenglan-media-assets/main/video/"

RENAMES = {
    "催眠麥克風 Division Battle Anthem+": "催眠麥克風 Rhyme Anima + OP",
    "とた - オリーブ": "致遙不可及彼方的你 主題曲",
    "幻想魔傳 最遊記": "幻想魔傳 最遊記 OP",
    "幸運星": "幸運☆星 OP",
}


def _name(url):
    return urllib.parse.unquote(url or "").rsplit("/", 1)[-1].rsplit(".", 1)[0]


def rename(apps, schema_editor):
    Work = apps.get_model("dramas", "Work")
    for w in Work.objects.exclude(mp3_links=[]):
        changed = False
        links = []
        for link in w.mp3_links or []:
            new = RENAMES.get(_name(link.get("url")))
            if new:
                link = {**link, "title": new, "url": RAW + urllib.parse.quote(f"{new}.m4a")}
                changed = True
            links.append(link)
        if changed:
            w.mp3_links = links
            w.save(update_fields=["mp3_links"])


class Migration(migrations.Migration):
    dependencies = [("dramas", "0003_link_new_theme_songs")]
    operations = [migrations.RunPython(rename, migrations.RunPython.noop)]
