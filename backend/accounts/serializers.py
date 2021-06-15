from rest_framework import serializers
from rest_framework.settings import api_settings
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions as django_exceptions
from django.db import IntegrityError, transaction
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings

from .models import User, Profile, UserAddress, UserReview
from store.serializers import CartSerializer, OrderDetailSerializer, ProductReviewSerializer, ProductSerializer


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
    products = ProductSerializer(many=True, read_only=True)
    user_product_reviews = ProductReviewSerializer(many=True, read_only=True)
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
            'products',
            'user_product_reviews',
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


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    default_error_messages = {
        "cannot_create_user": settings.CONSTANTS.messages.CANNOT_CREATE_USER_ERROR
    }

    class Meta:
        model = User
        fields = tuple(User.REQUIRED_FIELDS) + (
            settings.LOGIN_FIELD,
            settings.USER_ID_FIELD,
            "password",
        )

    def validate(self, attrs):
        user = User(**attrs)
        password = attrs.get("password")

        try:
            validate_password(password, user)
        except django_exceptions.ValidationError as e:
            serializer_error = serializers.as_serializer_error(e)
            raise serializers.ValidationError(
                {"password": serializer_error[api_settings.NON_FIELD_ERRORS_KEY]}
            )

        return attrs

    def create(self, validated_data):
        try:
            user = self.perform_create(validated_data)
        except IntegrityError:
            self.fail("cannot_create_user")

        return user

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            if settings.SEND_ACTIVATION_EMAIL:
                user.is_active = False
                user.save(update_fields=["is_active"])
        return user