import logging

from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import Http404
from django.views.decorators.http import require_POST
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect, render
from django.urls import reverse
from django.views.decorators.cache import never_cache

from .forms import LoginForm, RegisterForm

logger = logging.getLogger(__name__)


class AppLoginView(LoginView):
    template_name = "accounts/login.html"
    authentication_form = LoginForm
    redirect_authenticated_user = True


@never_cache
def register(request):
    """註冊成功後直接登入並進入首頁"""
    if request.user.is_authenticated:
        return redirect("player:home")
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("player:home")
    else:
        form = RegisterForm()
    return render(request, "accounts/register.html", {"form": form})


def csrf_failure(request, reason=""):
    """表單安全碼過期時（連按兩次送出、瀏覽器顯示快取的舊頁面、其他分頁已登入或登出），
    不顯示 403 錯誤頁，改為導回最新的頁面並提示重新操作。"""
    logger.warning("CSRF 驗證失敗，導回表單頁：%s %s", request.path, reason)
    # 例如連按兩次登入：第一次其實已成功，直接進首頁
    if request.user.is_authenticated:
        return redirect("player:home")
    target = reverse("accounts:register") if request.path == reverse("accounts:register") else reverse("accounts:login")
    return redirect(f"{target}?expired=1")


# ---------- 測試站專用：一鍵登入 ----------
# 只在 APP_ENV=staging（測試站）開放，正式站呼叫一律回 404。
# 測試站的資料庫每次部署都會清空，所以每次都用 get_or_create 確保測試帳號存在；
# 這個帳號沒有密碼（無法用帳密登入），只能透過這個按鈕進入。
QUICK_LOGIN_USERNAME = "quick_tester"


@require_POST
def quick_login(request):
    if settings.APP_ENV != "staging":
        raise Http404
    user, created = User.objects.get_or_create(username=QUICK_LOGIN_USERNAME, defaults={"email": "quick_tester@example.com"})
    if created:
        user.set_unusable_password()
        user.save()
    login(request, user, backend="django.contrib.auth.backends.ModelBackend")
    logger.info("測試站一鍵登入：%s", user.username)
    return redirect("player:home")
