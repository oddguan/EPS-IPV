from rest_framework import serializers
from .models import (
    User,
    Provider,
    Post,
    Log,
    Message,
    Location
)


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
