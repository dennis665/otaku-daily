from django.contrib.auth import login
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect, render

from .forms import LoginForm, RegisterForm


class AppLoginView(LoginView):
    template_name = "accounts/login.html"
    authentication_form = LoginForm
    redirect_authenticated_user = True


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
