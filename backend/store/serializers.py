from rest_framework import permissions, serializers

from .models import (
    Category, 
    Product, 
    Cart,
    CartItem, 
    OrderItem, 
    ProductReview
)


class CategorySerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    class Meta:
        model = Category
        fields = ['name', 'created_at', 'last_updated']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['total', 'created_at', 'last_updated']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['cart', 'product', 'quantity', 'created_at', 'last_updated']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'created_at', 'last_updated']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'product',
            'rating',
            'title',
            'body',
            'created_at',
            'last_updated'
        ]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'user',
            'category',
            'name',
            'description',
            'price',
            'disc_price',
            'in_stock',
            'image',
            'created_at',
            'last_updated',
        ]

