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
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phonenumber = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    hint = serializers.CharField(required=False)
    password = serializers.CharField()

    def __str__(self):
        return "{} {} {}".format(self.username, self.password, self.hint)


class VictimRegisterResponseSerializer(serializers.Serializer):
    username = serializers.CharField()
    id = serializers.IntegerField()
    is_victim = serializers.BooleanField()
    is_provider = serializers.BooleanField()


class ProviderRegisterRequestSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField(required=False)
    organization = serializers.CharField()
    phonenumber = serializers.CharField(required=False)
    username = serializers.CharField()
    hint = serializers.CharField(required=False)
    password = serializers.CharField()


class ProviderRegisterResponseSerializer(serializers.Serializer):
    # user = serializers.DictField(
    #     username=serializers.CharField(),
    #     email=serializers.EmailField(),
    #     id=serializers.IntegerField(),
    #     organization=serializers.CharField()
    # )
    # accessToken = serializers.CharField()
    pass


class LoginRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class LoginResponseSerializer(serializers.Serializer):
    username = serializers.CharField()
    id = serializers.IntegerField()
    is_victim = serializers.BooleanField()
    is_provider = serializers.BooleanField()


class ErrorResponseSerializer(serializers.Serializer):
    message = serializers.CharField()
