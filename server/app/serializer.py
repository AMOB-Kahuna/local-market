from django.contrib.auth.models import User
from rest_framework import serializers
from . models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password')
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['email'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.DecimalField(max_digits=3, decimal_places=2)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ('id', 'business', 'user', 'rating', 'comment', 'date')
        read_only_fields = ('id', 'date')

    def create(self, validated_data):
        request = self.context.get('request')
        user = getattr(request, "user", None)
        business = validated_data.get('business')
        if user and Review.objects.filter(business=business, user=user).exists():
            raise serializers.ValidationError("You have already submitted a review for this business.")
        return super().create(validated_data)

class BusinessSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Business
        fields = (
            'id', 'name', 'category', 'location', 'description',
            'detailed_description',
            'phone', 'email',
            'instagram_handle', 'twitter_handle', 'facebook_handle',
            'whatsapp_number', 'image',
            'owner', 'is_verified', 'lat', 'lng',
            'created_at', 'reviews'
        )

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
