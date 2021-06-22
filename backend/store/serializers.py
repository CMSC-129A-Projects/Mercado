from rest_framework import serializers
from django.db.models import Avg, Sum
from decimal import Decimal

from . import models


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


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
            'user',
            'profile',
            'product',
            'rating',
            'body',
            'image',
            'slug',
            'created_at',
            'last_updated',
        )
        depth = 1
        read_only_fields = ['user', 'product']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    product_review_product = ProductReviewSerializer(many=True, read_only=True)
    review_count = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = models.Product
        fields = (
            'id',
            'user',
            'category', 
            'name',
            'description',
            'slug',
            'price',
            'disc_price',
            'available_count',
            'sold_count',
            'image',
            'is_available',
            'location',
            'is_active',
            'created_at',
            'last_updated',
            'product_review_product',
            'review_count',
            'average_rating'
        )
        depth = 1

    def get_review_count(self, obj):
        return obj.product_review_product.count()

    def get_average_rating(self, obj):
        average = obj.product_review_product.all().aggregate(Avg('rating')).get('rating__avg')
        if average == None:
            return 0
        return average


class CartItemSerializer(serializers.ModelSerializer):
    cart_pk = serializers.PrimaryKeyRelatedField(
        queryset=models.Cart.objects.all(),
        source='cart'
    )
    product_pk = serializers.PrimaryKeyRelatedField(
        queryset=models.Product.objects.all(),
        source='product'
    )
    total = serializers.SerializerMethodField()

    class Meta:
        model = models.CartItem
        fields = (
            'id',
            'cart',
            'cart_pk',
            'product',
            'product_pk',
            'quantity',
            'total',
            'created_at',
            'last_updated'
        )
        depth = 1

    def get_total(self, obj):
        """
        Calculated the total amount of the item, 
        ``price`` or ``disc_price`` multiplied by the quantity
        """

        price = obj.product.disc_price if obj.product.disc_price > 0 else obj.product.price
        total = price * obj.quantity
        return total

    def create(self, validated_data):
        """
        Updates existing objects and also updates ``total`` in Cart 
        """

        # Calculating the total price 
        product_data = validated_data['product']
        quantity_data = validated_data['quantity']
        price = product_data.disc_price if product_data.disc_price > 0 else product_data.price
        total = price * quantity_data
        cart_item, created = models.CartItem.objects.update_or_create(
            cart=validated_data['cart'],
            product=validated_data['product'],
            defaults={
                'total': total,
                **validated_data
            }
        )

        cart_items = models.CartItem.objects.filter(cart=validated_data['cart'])
        total = 0
        for item in cart_items:
            total += item.total
        cart = models.Cart.objects.get(id=validated_data['cart'].id)
        cart.total = Decimal(total)
        cart.save()

        return cart_item


class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemSerializer(read_only=True, many=True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = models.Cart
        fields = (
            'id',
            'user',
            'slug',
            'total',
            'cart_items'
        )
    
    def get_total(self, obj):
        total = obj.cart_items.all().aggregate(Sum('total')).get('total__sum')
        return total

    def update(self, instance, validated_data):
        cart_items_data = validated_data['cart_items']
        total = 0.0
        for item in cart_items_data:
            total += item.total
        instance.total = total
        instance.save()
        return instance
