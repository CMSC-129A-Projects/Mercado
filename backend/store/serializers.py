from rest_framework import serializers

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
        fields = ['name']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['total']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['cart', 'product', 'quantity']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'product',
            'rating',
            'title',
            'body'
        ]


class ProductSerializer(serializers.ModelSerializer):
    product_reviews_product = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'name',
            'desc',
            'price',
            'disc_price',
            'categories',
            'in_stock',
            'product_reviews_product'
        ]

