from django.conf import settings


def app_env(request):
    """讓所有頁面都能判斷目前是正式站還是測試站"""
    return {"app_env": settings.APP_ENV, "app_version": settings.APP_VERSION, "app_built": settings.APP_BUILT}
