"""顯示名稱：有設定暱稱就用暱稱（存在 User.first_name），沒有就用帳號"""

NICKNAME_MAX = 20


def display_name(user):
    if not user:
        return ""
    return (user.first_name or "").strip() or user.username
