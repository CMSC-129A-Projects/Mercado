from rest_framework import routers

from .views import (ProfileViewSet, UserAddressViewSet)

app_name = 'accounts'

router = routers.SimpleRouter()

router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'user-address', UserAddressViewSet, basename='user-address')


urlpatterns = router.urls
