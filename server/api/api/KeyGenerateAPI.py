import io
from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import generics, permissions
from rest_framework.request import Request
from api.encryption import generate_key_pair


class KeyGenerateAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request):
        """
        Generates a new public-private key pair for the current logged in user
        """
        private_key, public_key = generate_key_pair()
        account = get_user_model().objects.filter(
            username=request.user.username)[0]
        account.encrypt_pk = public_key
        account.save()
        private_key_file = io.BytesIO(private_key)
        response = HttpResponse(
            private_key_file, content_type='application/csv')
        response['Content-Disposition'] = 'attachment; filename={}_private_key.csv'.format(
            account.username)
        return response
