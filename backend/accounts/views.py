from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView,CreateAPIView
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import CustomUserSerializer,RegisterUserSerializer,LoginUserSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
import logging
from datetime import datetime, timedelta
# Create your views here.

@permission_classes([AllowAny])
class Home(APIView):
    def get(self,request):
        content = {'message': 'Hello, World!'}
        return Response(content)
    

class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user
    
class UserRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        print("Login attempted")
        serializer = LoginUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            response = Response({
                "user": CustomUserSerializer(user).data
            },status=status.HTTP_200_OK)

            response.set_cookie(key="access_token",value=access_token,
                                httponly=True,
                                secure=True,
                                samesite="None",)
            response.set_cookie(key="refresh_token", value=str(refresh),
                                httponly=True,
                                secure=True, 
                                samesite="None")
            
            return response
        print(serializer.errors,'error')
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LogoutView(APIView):

    def post(self,request):
        refresh_token = request.COOKIES.get("refresh_token")

        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                refresh.blacklist()
            except Exception as e:
                return Response({"error":"Error INvalidating token" + str(e)},status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({"message":"Successfully logged out"},status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
    

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "Refresh token not provided"},status=status.HTTP_401_UNAUTHORIZED)
        
        try:

            # Validate and blacklist the old refresh token
            # old_refresh = RefreshToken(refresh_token)
            # old_refresh.blacklist()

            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({"message": "Access token successfully refreshed"}, status=status.HTTP_200_OK)

            response.set_cookie(key="access_token",value=access_token,httponly=True,
                                secure=True,samesite="None")
            
            return response
        
        except InvalidToken:
            return Response({"error":"Invalid token"},status=status.HTTP_401_UNAUTHORIZED)


