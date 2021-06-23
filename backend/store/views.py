from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from . import filters
from . import models
from . import serializers
from accounts.models import UserAddress


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticatedOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductSerializer
    lookup_field = 'slug'
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.ProductFilter
    search_fields = ['$name', '=category__name', '$description', 'slug']
    ordering_fields = ['created_at', 'sold_count']
    
    def get_queryset(self):
        user_address = UserAddress.objects.get(user=self.request.user)
        return models.Product.objects.filter(location=user_address.city)

    def perform_create(self, serializer):
        user_address = UserAddress.objects.get(user=self.request.user)
        serializer.save(user=self.request.user, location=user_address.city)


class CartViewSet(viewsets.ModelViewSet):
    queryset = models.Cart.objects.all()
    serializer_class = serializers.CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance , created = models.Cart.objects.get_or_create(user=self.request.user)
        serializer = serializers.CartSerializer(instance)
        return Response(serializer.data)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = models.CartItem.objects.all()
    serializer_class = serializers.CartItemSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return models.CartItem.objects.filter(cart__id=self.request.user.id)
    


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['user__id']

    def get_queryset(self):
        return self.queryset.filter(product__user=self.request.user)

    
class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = models.ProductReview.objects.all()
    serializer_class = serializers.ProductReviewSerializer
    lookup_field = 'slug'