from django.conf import settings
from django.contrib import admin
from django.urls import path, include

from .views import index
from user.views import AppUserCreationView

urlpatterns = [
    path('', include('frontend.urls')),
    path('admin/', admin.site.urls),
    path('registration/', AppUserCreationView),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug_toolbar__/', include(debug_toolbar.urls)),]