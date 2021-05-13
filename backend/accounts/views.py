from rest_framework import viewsets

from .models import (Profile, UserAddress)
from .serializers import (ProfileSerializer, UserAddressSerializer)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile
    serializer_class = ProfileSerializer
    lookup_field = 'user'

    def get_object(self):
        if self.request.method == 'PUT':
            obj, created = Profile.objects.get_or_create(user=self.request.user)

            return obj
        else:
            return super(ProfileViewSet, self).get_object()


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress
    serializer_class = UserAddressSerializer

    def get_object(self):
        if self.request.method == 'PUT':
            obj, created = UserAddress.objects.get_or_create(user=self.request.user)

            return obj
        else:
            return super(UserAddressViewSet, self).get_object()