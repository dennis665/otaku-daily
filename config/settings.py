"""
宅日常 (Otaku Daily) 網頁 App 設定
獨立於 CSI server 的個人專案，使用 SQLite，機密設定放在 .env。
"""
import os
from pathlib import Path

import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent


def _load_env(path):
    """讀取 .env 的 KEY=VALUE 設定到環境變數
    以本專案 .env 為準，避免被系統上其他專案設定的同名變數（如 SECRET_KEY）蓋掉"""
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ[key.strip()] = value.strip()


_load_env(BASE_DIR / ".env")

SECRET_KEY = os.environ["SECRET_KEY"]
DEBUG = os.environ.get("DEBUG", "False") == "True"
# 執行環境：production（正式站）/ staging（測試站，頁面頂端會顯示橫幅）
APP_ENV = os.environ.get("APP_ENV", "production")
# 抽卡不限次數的帳號（只在測試站有效，方便測試演出與機率）
GACHA_UNLIMITED_USERS = {"dennis"} if APP_ENV == "staging" else set()
# 目前部署的版本：Render 部署時會提供這次的 Git commit；App 用它判斷有沒有新版本可以更新
APP_VERSION = os.environ.get("RENDER_GIT_COMMIT") or "dev"

# 本機、Cloudflare 臨時網址 (*.trycloudflare.com) 與 Render 免費主機 (*.onrender.com)
ALLOWED_HOSTS = ["localhost", "127.0.0.1", ".trycloudflare.com", ".onrender.com"]
CSRF_TRUSTED_ORIGINS = ["https://*.trycloudflare.com", "https://*.onrender.com"]

# Cloudflare Tunnel 與 Render 都以 HTTPS 對外，並帶上 X-Forwarded-Proto
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "accounts",
    "player",
    "planner",
    "notifications",
    "dramas",
    "gacha",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "config.context_processors.app_env",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# 雲端主機由 DATABASE_URL 指定 PostgreSQL（免費主機的檔案會在重新部署或休眠後清空，不能用 SQLite）
# 本機沒有設定 DATABASE_URL 時使用 SQLite
DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "zh-hant"
TIME_ZONE = "Asia/Taipei"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
# 這次部署的建置時間（建置時 collectstatic 產生的靜態檔清單時間）：
# Render 換版時新舊機器會並行幾分鐘，App 只在伺服器的建置時間比自己新的時候才自動更新，不會被舊機器拉回舊版
try:
    APP_BUILT = int((STATIC_ROOT / "staticfiles.json").stat().st_mtime)
except OSError:
    APP_BUILT = 0
STATICFILES_DIRS = [BASE_DIR / "static"]
STORAGES = {
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_URL = "accounts:login"
LOGIN_REDIRECT_URL = "player:home"
LOGOUT_REDIRECT_URL = "accounts:login"

# 登入狀態保留 30 天，App 開啟不必每次重新登入
SESSION_COOKIE_AGE = 60 * 60 * 24 * 30
SESSION_COOKIE_HTTPONLY = True
# 對外一律走 HTTPS；瀏覽器把 localhost 視為安全來源，本機 http 測試也能正常登入
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
# 表單過期時導回最新頁面，而不是顯示 403 錯誤頁
CSRF_FAILURE_VIEW = "accounts.views.csrf_failure"
