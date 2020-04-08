import sys

from django.contrib.auth import get_user_model
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

        account = get_user_model().objects.create_account(
            serializer.data['username'],
            serializer.data['password'],
            hint,
            'a random pk'
        )
        account.is_victim = True
        account.save()

        victim = Victim(
            account=account,
            first_name=serializer.data['first_name'],
            last_name=serializer.data['last_name'],
            phonenumber='12345',
            email='test@example.com'
        )
        try:
            victim.save()
        except:
            print(sys.exc_info()[0].__cause__)
            return Response(status=500)

        return Response({
            'user': VictimRegisterResponseSerializer(
                account,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        })
