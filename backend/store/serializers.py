from rest_framework import serializers
from django.db.models import Avg

from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CartItem
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.Cart
        fields = (
            'id',
            'user',
            'total',
            'cart_items'
        )
        read_only_fields = ['user']


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PaymentDetail
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    order_payment = PaymentSerializer(read_only=True)
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.OrderDetail
        fields = (
            'id',
            'user',
            'total',
            'order_payment',
            'created_at',
            'items'
        )
        read_only_fields = ['user']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProductReview
        fields = (
            'id',
            'product',
            'rating',
            'title',
            'body',
            'image',
            'slug',
            'created_at',
            'last_updated',
        )
        read_only_fields = ['user', 'product']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=models.Category.objects.all())
    product_product_reviews = ProductReviewSerializer(many=True, read_only=True)
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = (
            'id',
            'shop',
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
        )

    def get_review_count(self, obj):
        return obj.product_product_reviews.count()

    def get_average_rating(self, obj):
        average = obj.product_product_reviews.all().aggregate(Avg('rating')).get('rating__avg')
        if average == None:
            return 0
        return average


class ShopSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = models.Shop
        fields = (
            'id',
            'user',
            'name',
            'slug',
            'description'
            'created_at',
            'products'
        )