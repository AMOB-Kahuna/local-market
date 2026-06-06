from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from django.db.models import Avg, Value, DecimalField
from django.db.models.functions import Coalesce

from .models import Business, Review
from .serializer import *

class BusinessListCreateView(APIView):
    parser_classes = [FormParser, MultiPartParser, JSONParser]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        businesses = Business.objects.all()
        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ReviewListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user_obj = User.objects.filter(email=email).first()
        if user_obj is None:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user_obj.username, password=password)
        if user is None:
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)

        return Response({
            "id": user.id,
            "email": user.email,
            "username": user.username,
        }, status=status.HTTP_200_OK)

class BusinessDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        business = get_object_or_404(Business, pk=pk)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)

class MyBusinessView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser, JSONParser]

    def get(self, request):
        business = Business.objects.filter(owner=request.user).first()
        if not business:
            return Response({"detail": "No business found"}, status=404)
        serializer = BusinessSerializer(business)
        return Response(serializer.data)

    def put(self, request):
        business = Business.objects.filter(owner=request.user).first()
        if not business:
            return Response({"detail": "No business found"}, status=404)
        serializer = BusinessSerializer(business, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    patch = put

class TopRatedBusinessListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        businesses = Business.objects.annotate(
            avg_rating=Coalesce(
                Avg('reviews__rating'),
                Value(0, output_field=DecimalField()),
                output_field=DecimalField(),
            )
        ).order_by('-avg_rating')[:3]

        serializer = BusinessSerializer(businesses, many=True)
        return Response(serializer.data)
