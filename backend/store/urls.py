from rest_framework import routers

from .views import (CategoryViewSet, ProductViewSet, CartViewSet, CartItemViewSet, ProductReviewViewSet)

router = routers.SimpleRouter()

router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')
router.register(r'product-reviews', ProductReviewViewSet, basename='product-reviews')

urlpatterns = router.urls
