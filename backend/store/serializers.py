from rest_framework import serializers
from django.db.models import Avg

from .models import (
    Category,
    OrderDetail,
    PaymentDetail, 
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


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'created_at', 'last_updated']
        read_only_fields = ['product']


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = [
            'id',
            'user',
            'total',
            'cart_items'
        ]
        read_only_fields = ['user']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'created_at', 'last_updated']


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentDetail
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = OrderDetail
        fields = ['__all__', 'items']
        read_only_fields = ['user']
        depth = 1


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = [
            'id',
            'product',
            'rating',
            'title',
            'body',
            'image',
            'slug',
            'created_at',
            'last_updated',
        ]
        read_only_fields = ['user', 'product']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    product_product_reviews = ProductReviewSerializer(many=True, read_only=True)
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

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
            'locality',
            'is_active',
            'created_at',
            'last_updated',
            'product_product_reviews',
            'review_count',
            'average_rating'
        ]
        read_only_fields = ['user']

    def get_review_count(self, obj):
        return obj.product_product_reviews.count()

    def get_average_rating(self, obj):
        average = obj.product_product_reviews.all().aggregate(Avg('rating')).get('rating__avg')
        if average == None:
            return 0
        return average