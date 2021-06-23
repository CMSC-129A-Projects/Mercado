from rest_framework import serializers
from django.conf import settings
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings

from .models import User, Profile, UserAddress, UserReview
from store.serializers import CartSerializer, OrderItemSerializer, ProductReviewSerializer

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
            'id',
            'user',
            'address_line1', 
            'brgy', 
            'city',
            'province',
            'region'
        )
        read_only_fields = ['user']


class UserReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserReview
        fields = (
            'id',
            'author',
            'profile',
            'rating',
            'body',
            'slug',
            'created_at',
            'last_updated',
        )
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    user_address = UserAddressSerializer(read_only=True)
    user_review_author = UserReviewSerializer(many=True, read_only=True)
    user_review_recipient = UserReviewSerializer(many=True, read_only=True)
    product_review_author = ProductReviewSerializer(many=True, read_only=True)
    user_cart = CartSerializer(read_only=True)
    orders = OrderItemSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.USER_ID_FIELD,
            settings.LOGIN_FIELD,
            'is_set',
            'profile',
            'user_address',
            'user_review_author',
            'user_review_recipient',
            'product_review_author',
            'user_cart',
            'orders'
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
        