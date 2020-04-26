from io import StringIO, BytesIO
from zipfile import ZipFile
from django.http import HttpResponse
from django.core.files import File
from rest_framework import generics, permissions
from api.models import *


class SARAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        zip_file = BytesIO()

        with ZipFile(zip_file, 'w') as zip_obj:
            account_csv = 'username,hint,public_key,is_user,is_helper,first_name,last_name,phonenumber,email\n'
            victim = Victim.objects.filter(account=request.user)[0]
            username = request.user.username
            hint = request.user.hint
            public_key = str(request.user.encrypt_pk)
            is_user = request.user.is_victim
            is_helper = request.user.is_provider
            first_name = victim.first_name
            last_name = victim.last_name
            phonenumber = victim.phonenumber
            email = victim.email

            account_csv += f'{username},{hint},{public_key},{is_user},{is_helper},{first_name},{last_name},{phonenumber},{email}\n'
            zip_obj.writestr('account.csv', account_csv)

            log_csv = 'title,content,sym_key,created_at,is_image\n'
            logs = Log.objects.filter(author=victim)
            for log in logs:
                title = log.title
                content = log.content
                sym_key = str(log.encrypted_sym_key)
                created_at = log.created_at
                is_image = log.is_image

                log_csv += f'{title},{content},{sym_key},{created_at},{is_image}\n'
            zip_obj.writestr('logs.csv', log_csv)

        response = HttpResponse(
            File(zip_file), content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename={}-sar.zip'.format(
            request.user.username)
        return response
