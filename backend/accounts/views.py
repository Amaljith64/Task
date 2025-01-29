from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class Home(APIView):
    def get(self,request):
        content = {'message': 'Hello, World!'}
        return Response(content)
