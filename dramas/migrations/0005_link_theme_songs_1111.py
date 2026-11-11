"""把 2026-11-11 匯入影音庫的動畫歌連到追劇庫的作品；作品以 youranimes 編號對應，已連過的不重複加"""
import urllib.parse

from django.db import migrations

RAW = "https://raw.githubusercontent.com/dennis665/fenglan-media-assets/main/video/"

LINKS = {
    246: "輝夜姬想讓人告白 OP",                          # 輝夜姬想讓人告白～天才們的戀愛頭腦戰～（第一季）
    4164: "擅長逃跑的殿下 OP 完整版",                    # 擅長逃跑的殿下（原本已有 TV 版）
    3307: "DARKER THAN BLACK 黑之契約者 流星之雙子 OP",
    483: "女高中生的虛度日常 OP",
    1419: "怪醫黑傑克 OP",                               # 2004 年 TV 版（OP「月光花」）
}


def link(apps, schema_editor):
    Work = apps.get_model("dramas", "Work")
    for source_id, name in LINKS.items():
        w = Work.objects.filter(source_id=source_id).first()
        if not w:
            continue
        links = list(w.mp3_links or [])
        if any(urllib.parse.unquote(l.get("url", "")).rsplit("/", 1)[-1].rsplit(".", 1)[0] == name for l in links):
            continue
        links.append({"title": name, "url": RAW + urllib.parse.quote(f"{name}.m4a")})
        w.mp3_links = links
        w.save(update_fields=["mp3_links"])


class Migration(migrations.Migration):
    dependencies = [("dramas", "0004_rename_theme_songs")]
    operations = [migrations.RunPython(link, migrations.RunPython.noop)]
