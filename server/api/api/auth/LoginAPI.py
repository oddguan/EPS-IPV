#This file creates the API for login action. Three serializer files imported from serializer.py are used. 
#The class will firstly filter the username from the input data and look for any registration record. 
#If not found, an error message will be returned.
#If there is one, the input password will be checked and an accessToken will be generated for login process.
#If the password is not correct and the account belongs to a victim, an error message will be returned indicating that the account does not exist. 
#If the password is not correct and the account does not belong to a victim, an error message will be returned to let the user try again. 
from django.contrib.auth.hashers import check_password
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from api.serializers import LoginRequestSerializer, LoginResponseSerializer, ErrorResponseSerializer
from api.models import Account


class LoginAPI(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginRequestSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            account = Account.objects.filter(
                username=serializer.data['username'])[0]
        except:
            return Response(ErrorResponseSerializer({
                'message': 'Error! Username not found.'
            }, context=self.get_serializer_context()).data, status=401)

        if check_password(serializer.data['password'], account.password):
            return Response({
                'user': LoginResponseSerializer(account, context=self.get_serializer_context()).data,
                'accessToken': str(RefreshToken.for_user(account).access_token)
            })

        error_message = 'Wrong password. Please try again.'
        if account.is_victim:
            error_message = 'Error! Username not found'
        return Response(ErrorResponseSerializer({
            'message': error_message
        }, context=self.get_serializer_context()).data, status=401)
