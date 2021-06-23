from rest_framework import routers

from .views import (
    CategoryViewSet, 
    OrderItemViewSet, 
    ProductViewSet, 
    CartViewSet, 
    CartItemViewSet, 
    ProductReviewViewSet
)

router = routers.SimpleRouter()

router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cart-items')
router.register(r'orders', OrderItemViewSet, basename='orders')
router.register(r'product-reviews', ProductReviewViewSet, basename='product-reviews')

urlpatterns = router.urls
