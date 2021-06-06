from rest_framework import viewsets, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from . import filters

from .models import (
    Category,
    OrderDetail,
    OrderItem, 
    Product, 
    Cart,
    CartItem, 
    ProductReview
)
from .serializers import (
    CartItemSerializer, 
    CategorySerializer,
    OrderDetailSerializer,
    OrderItemSerializer, 
    ProductSerializer, 
    CartSerializer, 
    CartItemSerializer, 
    ProductReviewSerializer
)
from accounts.models import UserAddress
from accounts.permissions import IsOwnerOrReadOnly


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAdminUser, permissions.IsAuthenticatedOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = filters.ProductFilter
    search_fields = ['$name', '=category__name', '$description', 'slug']
    ordering_fields = ['sold']
    
    def get_queryset(self):
        user_address = UserAddress.objects.get(user=self.request.user)
        return Product.objects.filter(locality=user_address.locality)

    def perform_create(self, serializer):
        user_address = UserAddress.objects.get(user=self.request.user)
        serializer.save(user=self.request.user, locality=user_address.locality)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance , created = Cart.objects.get_or_create(user=self.request.user)
        serializer = CartSerializer(instance)
        return Response(serializer.data)


class CartItemViewSet(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class OrderDetailViewSet(viewsets.ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer


class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

    
class ProductReviewViewSet(viewsets.ModelViewSet):
    queryset = ProductReview.objects.all()
    serializer_class = ProductReviewSerializer
    lookup_field = 'slug'