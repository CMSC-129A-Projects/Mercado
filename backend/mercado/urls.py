from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('accounts/', include('accounts.urls')),
    path('store/', include('store.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug_toolbar__/', include(debug_toolbar.urls)),]