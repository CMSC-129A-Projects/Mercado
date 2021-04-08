from rest_framework import status
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny

from .serializers import CreateUserSerializer 

class CreateUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = CreateUserSerializer(data=request.data)
        
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()

            if new_user:
                return Response(status=status.HTTP_201_CREATED)
            
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)