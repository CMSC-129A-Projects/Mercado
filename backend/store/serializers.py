from rest_framework import fields, serializers

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
        fields = ['__all__', 'cart_items']
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
        exclude = ['slug']
        read_only_fields = ['user', 'product']
        depth = 1


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    product_reviews = ProductReviewSerializer(many=True, read_only=True)
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
            'product_reviews'
        ]
        read_only_fields = ['user']