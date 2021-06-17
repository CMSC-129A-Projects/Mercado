from rest_framework import serializers
from django.conf import settings
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings

from .models import User, Profile, UserAddress, UserReview
from store.serializers import (
    CartSerializer, 
    OrderDetailSerializer, 
    ProductReviewSerializer, 
    ShopSerializer
)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'id',
            'user',
            'slug',
            'image',
            'dob',
            'gender',
            'bio'
        )


class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = (
            'user',
            'address_line1', 
            'address_line2', 
            'locality',
            'province',
            'region'
        )
        read_only_fields = ['user']


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = (
            'rating',
            'body',
            'slug',
            'created_at',
            'last_updated',
        )


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    user_address = UserAddressSerializer(read_only=True)
    user_reviews_from = UserReviewSerializer(many=True, read_only=True)
    user_reviews_to = UserReviewSerializer(many=True, read_only=True)
    user_product_reviews = ProductReviewSerializer(many=True, read_only=True)
    shop = ShopSerializer(read_only=True)
    user_cart = CartSerializer(read_only=True)
    order_detail = OrderDetailSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            'profile',
            'user_address',
            'user_reviews_from',
            'user_reviews_to',
            'user_product_reviews',
            'shop',
            'user_cart',
            'order_detail'
        )
        read_only_fields = (settings.LOGIN_FIELD,)

    def update(self, instance, validated_data):
        email_field = get_user_email_field_name(User)
        if settings.SEND_ACTIVATION_EMAIL and email_field in validated_data:
            instance_email = get_user_email(instance)
            if instance_email != validated_data[email_field]:
                instance.is_active = False
                instance.save(update_fields=["is_active"])
        return super().update(instance, validated_data)
        