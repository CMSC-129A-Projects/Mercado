from rest_framework import viewsets

from . import models
from .serializers import (ProfileSerializer, UserAddressSerializer, UserSerializer)
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

    def partial_update(self, request, *args, **kwargs):
        user = models.User.objects.get(username=self.request.user.username)
        user.is_set = True
        user.save()
        return super().partial_update(request, *args, **kwargs)