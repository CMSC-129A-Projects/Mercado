from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('accounts/', include('accounts.urls')),
    path('store/', include('store.urls')),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug_toolbar__/', include(debug_toolbar.urls)),]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
