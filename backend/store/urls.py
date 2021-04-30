from rest_framework import routers

from .views import (CategoryViewSet, ProductViewSet, ProductReviewViewSet)

router = routers.SimpleRouter()

router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-reviews', ProductReviewViewSet)

urlpatterns = router.urls
