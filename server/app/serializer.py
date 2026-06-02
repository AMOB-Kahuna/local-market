from rest_framework import serializers
from . models import *

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
            'phone', 'email', 'owner', 'is_verified', 'lat', 'lng',
            'created_at', 'reviews'
        )
