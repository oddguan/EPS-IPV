import sys

from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.utils import InternalError, IntegrityError
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import (
    VictimRegisterRequestSerializer,
    VictimRegisterResponseSerializer,
    ProviderRegisterRequestSerializer,
    ProviderRegisterResponseSerializer,
    ErrorResponseSerializer
)
from api.models import Victim, Provider


class VictimRegisterAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = VictimRegisterRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hint = serializer.data.get('hint')
        if not hint:
            hint = 'default hint'

        try:
            account = get_user_model().objects.create_account(
                serializer.data.get('username'),
                serializer.data.get('password'),
                hint,
                'a random pk'
            )
            account.is_victim = True
            account.save()
        except InternalError as e:
            print(e)
            return Response(ErrorResponseSerializer({
                'message': 'Username already exists! Please try another one. '
            }, context=self.get_serializer_context()).data, status=401)

        victim = Victim()
        victim.account = account
        victim.first_name = serializer.data.get('first_name')
        victim.last_name = serializer.data.get('last_name')
        victim.phonenumber = serializer.data.get('phonenumber')
        victim.email = serializer.data.get('email')

        try:
            victim.save()
        except InternalError as e:
            print(e)
            return Response(ErrorResponseSerializer({
                'message': 'Unknown database error! Please try again.'
            }, context=self.get_serializer_context()).data, status=500)

        return Response({
            'user': VictimRegisterResponseSerializer(
                account,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        }, status=200)


class ProviderRegisterAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProviderRegisterRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hint = serializer.data.get('hint')
        if not hint:
            hint = 'default hint'

        try:
            account = get_user_model().objects.create_account(
                serializer.data.get('username'),
                serializer.data.get('password'),
                hint,
                'a random pk'
            )
            account.is_provider = True
            account.save()
        except InternalError as e:
            print(e)
            return Response(ErrorResponseSerializer({
                'message': 'Username already exists! Please try another one. '
            }, context=self.get_serializer_context()).data, status=401)
        except IntegrityError as e:
            print(e)
            return Response(ErrorResponseSerializer({
                'message': 'Username already exists! Please try another one. '
            }, context=self.get_serializer_context()).data, status=401)

        provider = Provider()
        provider.account = account
        provider.first_name = serializer.data.get('first_name')
        provider.last_name = serializer.data.get('last_name')
        provider.org_name = serializer.data.get('organization')
        provider.email = serializer.data.get('email')
        provider.phonenumber = serializer.data.get('phonenumber')

        try:
            provider.save()
        except InternalError as e:
            print(e)
            return Response(ErrorResponseSerializer({
                'message': 'Unknown database error! Please try again.'
            }, context=self.get_serializer_context()).data, status=500)

        return Response({
            'user': VictimRegisterResponseSerializer(
                account,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        }, status=200)
