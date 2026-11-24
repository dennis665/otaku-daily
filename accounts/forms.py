from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User

from .names import NICKNAME_MAX


class RegisterForm(UserCreationForm):
    """註冊表單：帳號、Email、密碼兩次"""

    email = forms.EmailField(label="Email", required=True, help_text="忘記密碼時用來找回帳號")

    class Meta:
        model = User
        fields = ("username", "email")
        labels = {"username": "帳號"}
        help_texts = {"username": "最多 150 字，可用英文、數字與 @ . + - _"}

    def clean_email(self):
        email = self.cleaned_data["email"].strip().lower()
        if User.objects.filter(email__iexact=email).exists():
            raise forms.ValidationError("這個 Email 已經註冊過了")
        return email


class LoginForm(AuthenticationForm):
    username = forms.CharField(label="帳號", widget=forms.TextInput(attrs={"autofocus": True, "autocomplete": "username"}))
    password = forms.CharField(label="密碼", strip=False, widget=forms.PasswordInput(attrs={"autocomplete": "current-password"}))


class ProfileForm(forms.Form):
    """個人設定：目前只有暱稱（存在 User.first_name，空白＝顯示帳號）"""

    nickname = forms.CharField(
        label="暱稱", required=False, max_length=NICKNAME_MAX,
        help_text=f"最多 {NICKNAME_MAX} 字，會取代帳號顯示在頁首、行程、群組與通知；留空就顯示帳號",
        widget=forms.TextInput(attrs={"autocomplete": "nickname", "placeholder": "例如：芙莉蓮粉"}),
    )

    def clean_nickname(self):
        return " ".join(self.cleaned_data["nickname"].split())
