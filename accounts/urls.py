from rest_framework import routers

from .views import (ProfileViewSet, UserAddressViewSet)

app_name = 'accounts'

router = routers.SimpleRouter()

router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'location', UserAddressViewSet, basename='location')


urlpatterns = router.urls
