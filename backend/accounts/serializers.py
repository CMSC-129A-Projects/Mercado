from rest_framework import serializers
from django.conf import settings

from .models import (User, Profile, UserAddress, UserReview)
from store.models import (Product, ProductReview, Cart)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'image']
        lookup_field = 'user'


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = [
            'address_line1', 
            'address_line2', 
            'city',
            'postal_code',
            'country'
        ]


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = [
            'recipient',
            'rating',
            'title',
            'body',
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user_address = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user_reviews_from = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    user_reviews_to = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    product_reviews_user = serializers.PrimaryKeyRelatedField(many=True, queryset=ProductReview.objects.all())
    carts = serializers.PrimaryKeyRelatedField(many=True, queryset=Cart.objects.all())

    class Meta:
        model = User
        fields = [
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'created_at',
            'last_updated',
            'profile',
            'user_address',
            'user_reviews_from',
            'user_reviews_to',
            'products',
            'product_reviews_user',
            'carts'
        ]