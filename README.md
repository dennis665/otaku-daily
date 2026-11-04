# 宅日常 (Otaku Daily)

個人用的網頁 App（可加入手機主畫面安裝）：帳號登入、動漫影音播放。

## 本機執行（Windows）

```bat
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
rem 建立 .env，內容至少要有 SECRET_KEY=一串隨機字元
.venv\Scripts\python manage.py migrate
start.bat
```

開啟 http://127.0.0.1:8765 。本機沒有設定 `DATABASE_URL` 時使用 SQLite。

## 雲端部署（Render 免費方案）

1. 把專案推到 GitHub。
2. 在 Render 選 **New → Blueprint**，選這個儲存庫，Render 會依 `render.yaml` 建立網站與 PostgreSQL 資料庫。
3. 部署完成後網址為 `https://otaku-daily-xxxx.onrender.com`。

免費方案閒置約 15 分鐘會休眠，下次開啟需等待數十秒喚醒。

## 影音來源

清單讀取 GitHub 儲存庫 `dennis665/fenglan-media-assets` 的 `video` 資料夾，同名 `.mp3` / `.mp4` 視為同一首，快取 10 分鐘。
