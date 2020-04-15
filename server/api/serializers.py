'''
This file defines serializers of the REST framework for this project.
These serializers allow complex data such as querysets and model instances to be converted to native Python datatypes that can then be easily rendered into JSON format.
Similarly, the ModelSerializer classes provide a useful shortcut for creating serializers that deal with model instances and queryset.
'''
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
        exclude = ['author']


class PostIdResponseSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class PostDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    content = serializers.CharField()
    created_at = serializers.DateTimeField()
    author = serializers.CharField()


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


class UserDetailResponseSerializer(serializers.Serializer):
    is_victim = serializers.BooleanField()
    is_provider = serializers.BooleanField()
    username = serializers.CharField()
    id = serializers.IntegerField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField(required=False)
    phonenumber = serializers.CharField(required=False)
    organization = serializers.CharField(required=False)


class ImageSerializer(serializers.Serializer):
    file = serializers.ImageField()


class ImageLinkSerializer(serializers.Serializer):
    link = serializers.CharField()


class ImageResponseSerializer(serializers.Serializer):
    image = serializers.ImageField()
