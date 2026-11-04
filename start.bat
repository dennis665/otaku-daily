@echo off
rem 啟動宅日常網頁 App (http://127.0.0.1:8765)
cd /d %~dp0
.venv\Scripts\python manage.py collectstatic --noinput -v 0
.venv\Scripts\waitress-serve --listen=127.0.0.1:8765 --threads=8 config.wsgi:application
