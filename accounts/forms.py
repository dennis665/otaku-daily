from django import forms
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import User


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
