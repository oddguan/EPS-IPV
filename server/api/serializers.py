from abc import ABC

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (
    Victim,
    Provider,
    Post,
    Log,
    Message,
    Location
)


class VictimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Victim
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = '__all__'


class VictimRegisterRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    hint = serializers.CharField()

    def __str__(self):
        return "{} {} {}".format(self.username, self.password, self.hint)


class VictimRegisterResponseSerializer(serializers.Serializer):
    username = serializers.CharField()
    id = serializers.IntegerField()


class JWTTokenSerializer():
    pass