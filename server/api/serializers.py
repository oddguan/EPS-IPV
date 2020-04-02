from rest_framework import serializers
from .models import (
    User,
    Provider,
    Post,
    Log,
    Message,
    Location
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
