import sys

from django.contrib.auth import get_user_model
from django.db import transaction
from django.db.utils import InternalError
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import VictimRegisterRequestSerializer, VictimRegisterResponseSerializer
from api.models import Victim


class VictimRegisterAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = VictimRegisterRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        hint = serializer.data.get('hint') if serializer.data.get(
            'hint') else 'default hint'
        email = serializer.data.get('email') if serializer.data.get(
            'email') else 'fake@example.com'
        phonenumber = serializer.data.get(
            'phonenumber') if serializer.data.get('phonenumber') else '111'

        try:
            account = get_user_model().objects.create_account(
                serializer.data['username'],
                serializer.data['password'],
                hint,
                'a random pk'
            )
            account.is_victim = True
            account.save()
        except InternalError as e:
            print(e)
            return Response(status=500)

        victim = Victim()
        victim.account = account
        victim.first_name = serializer.data.get('first_name')
        victim.last_name = serializer.data.get('last_name')
        victim.phonenumber = phonenumber
        victim.email = email

        try:
            victim.save()
        except InternalError as e:
            print(e)
            return Response(status=500)

        return Response({
            'user': VictimRegisterResponseSerializer(
                account,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        }, status=200)
