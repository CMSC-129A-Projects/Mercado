from rest_framework import viewsets, permissions

from .models import (Category, Product, ProductReview)
from .serializers import (CategorySerializer, ProductSerializer, ProductReviewSerializer)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticatedOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    
class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer