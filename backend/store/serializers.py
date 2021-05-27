from rest_framework import permissions, serializers

from .models import (
    Category,
    OrderDetail, 
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


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'user',
            'category',
            'name',
            'description',
            'slug',
            'price',
            'disc_price',
            'stock',
            'sold',
            'image',
            'in_stock',
            'created_at',
            'last_updated',
        ]


class CartSerializer(serializers.ModelSerializer):
    cart_items = serializers.PrimaryKeyRelatedField(many=True, queryset=CartItem.objects.all())

    class Meta:
        model = Cart
        fields = [
            'cart_items',
            'total', 
            'slug', 
            'created_at', 
            'last_updated'
        ]


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = [
            'id',
            'cart',
            'product', 
            'quantity', 
            'created_at', 
            'last_updated'
        ]


class OrderDetailSerializer(serializers.ModelSerializer):
    items = serializers.PrimaryKeyRelatedField(many=True, queryset=OrderItem.objects.all())

    class Meta:
        model = OrderDetail
        fields = ['items', 'total', 'payment', 'created_at', 'last_updated']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'created_at', 'last_updated']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'id',
            'product',
            'rating',
            'title',
            'body',
            'slug',
            'image',
            'created_at',
            'last_updated'
        ]

