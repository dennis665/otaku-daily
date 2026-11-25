"""
🎞 AI 動畫分頁：自己用 AI 製作的原創動畫作品。

新增作品：影片（H.264＋AAC、moov 在檔頭才能邊下載邊播，ffmpeg 加 -movflags +faststart）與封面圖
放 static/video/works/，在 WORKS 加一筆（新的放最前面）。影片由網站的靜態檔提供（WhiteNoise 支援分段讀取，
iPhone 可以邊下載邊播），service worker 不會把整支影片存進手機。
"""

WORKS = [
    {
        "slug": "daizhuan-99",
        "title": "待轉區的 99 秒",
        "en": "99 Seconds in the Waiting Box",
        "tagline": "全台灣最漫長的 99 秒紅燈，卻是我每天最希望永遠不要變綠燈的瞬間。",
        "genre": "台灣通勤日常・青春戀愛微喜劇",
        "desc": "每天早上 7:25，阿宇都準時滑進十字路口的機車待轉區，只為了跟背著大畫筒的小晴並排停這 99 秒。"
                "後照鏡裡的暗戀、早餐店阿姨的神助攻、午後雷陣雨的騎樓——一段發生在台灣街頭的青春小故事。",
        "video": "video/works/daizhuan-99.mp4",
        "poster": "video/works/daizhuan-99.jpg",
        "duration": "1:31",
        "made": "2026 年 11 月",
        "tags": ["原創", "Happy End", "720p"],
    },
]
