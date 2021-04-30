from rest_framework import serializers
from django.conf import settings

from .models import (User, Profile, UserAddress, UserReview)
from store.models import (Product, ProductReview, ShoppingSession)


class UserSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    product_reviews_user = serializers.PrimaryKeyRelatedField(many=True, queryset=ProductReview.objects.all())
    shopping_sessions = serializers.PrimaryKeyRelatedField(many=True, queryset=ShoppingSession.objects.all())

    class Meta:
        model = User
        fields = (
            'email',
            'first_name',
            'last_name',
            'phone_number',
            'products',
            'product_reviews_user',
            'shopping_sessions'
        )


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Profile
        fields = ('user', 'bio')


class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserAddress
        fields = (
            'user',
            'address_line1', 
            'address_line2', 
            'city',
            'postal_code',
            'country'
        )


class UserReviewSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    recipient = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserReview
        fields = (
            'created_by',
            'recipient',
            'rating',
            'title',
            'body',
            'slug'
        )