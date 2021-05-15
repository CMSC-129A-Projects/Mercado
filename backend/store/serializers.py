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
    categories = serializers.StringRelatedField(many=True)
    product_reviews_product = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id',
            'created_by',
            'name',
            'desc',
            'price',
            'disc_price',
            'categories',
            'in_stock',
            'created_at',
            'last_updated',
            'product_reviews_product'
        ]

