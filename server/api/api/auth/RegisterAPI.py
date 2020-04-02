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

        account = get_user_model().objects.create_account(
            serializer.data['username'],
            serializer.data['password'],
            serializer.data['hint'],
            'a random pk'
        )
        account.is_victim = True
        account.save()

        victim = Victim(account=account)
        victim.save()

        return Response({
            'victim': VictimRegisterResponseSerializer(
                account,
                context=self.get_serializer_context()
            ).data,
            'accessToken': str(RefreshToken.for_user(account).access_token)
        })
