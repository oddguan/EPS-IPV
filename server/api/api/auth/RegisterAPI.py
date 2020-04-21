# This file creates the API for registration.
import sys

from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.utils import InternalError, IntegrityError
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import (
    VictimRegisterRequestSerializer,
    ProviderRegisterRequestSerializer,
    UserDetailResponseSerializer,
    ErrorResponseSerializer
)
from api.models import Victim, Provider, Account
from api.encryption import generate_key_pair


def get_user_detail_dict(account: Account) -> dict:
    """
    A util method for retrieving user detail response dict
    """
    response_dict = {
        "is_victim": account.is_victim,
        "is_provider": account.is_provider,
        "username": account.username,
        "id": account.id
    }
    if account.is_victim:
        user = Victim.objects.filter(account=account)[0]
    else:  # account.is_provider
        user = Provider.objects.filter(account=account)[0]
        response_dict['organization'] = user.org_name

    response_dict['first_name'] = user.first_name
    response_dict['last_name'] = user.last_name
    response_dict['phonenumber'] = user.phonenumber
    response_dict['email'] = user.email

    return response_dict


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
            private_key, public_key = generate_key_pair()
            account = get_user_model().objects.create_account(
                serializer.data.get('username'),
                serializer.data.get('password'),
                hint,
                public_key
            )
            account.is_victim = True
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

        response_dict = get_user_detail_dict(account)

        return Response({
            'user': UserDetailResponseSerializer(
                response_dict,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token),
            'privateKey': str(private_key)
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
                'no_pk_for_providers'
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

        response_dict = get_user_detail_dict(account)
        return Response({
            'user': UserDetailResponseSerializer(
                response_dict,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        }, status=200)
