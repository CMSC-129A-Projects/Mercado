from rest_framework import routers

from .views import (CategoryViewSet, ProductViewSet, ProductReviewViewSet)

router = routers.SimpleRouter()

router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'product-reviews', ProductReviewViewSet, basename='product-reviews')

urlpatterns = router.urls
