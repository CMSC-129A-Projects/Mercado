from rest_framework import viewsets

from . import models
from .serializers import (ProfileSerializer, UserAddressSerializer)
from accounts.permissions import IsOwnerOrReadOnly


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile
    serializer_class = ProfileSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = models.UserAddress
    serializer_class = UserAddressSerializer
    lookup_field = 'user__username'
    permission_classes =  [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)