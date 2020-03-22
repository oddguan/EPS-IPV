from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from account.api.serializers import RegistrationSerializer


@api_view(['POST', ])
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'successfully registered new user.'
            data['firstname'] = account.firstname
            data['lastname'] = account.firstname
            data['username'] = account.username
            data['email'] = account.email
            data['password'] = account.password
        else:
            data = serializer.errors
        return Response(data)