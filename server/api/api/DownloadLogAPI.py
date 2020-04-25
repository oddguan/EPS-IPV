from io import BytesIO
from zipfile import ZipFile
from django.http import HttpResponse
from django.core.files import File
from rest_framework import generics, permissions
from rest_framework.response import Response
from api.models import Provider, Log, ImageLog, Victim, Account, LogRequest


class DownloadLogAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, victim_username):
        user = request.user
        # Make sure the request is from a help provider
        try:
            provider = Provider.objects.filter(account=user)[0]
        except:
            return Response(status=401)

        victim_account = Account.objects.filter(username=victim_username)[0]
        victim_obj = Victim.objects.filter(account=victim_account)[0]

        logs = list(Log.objects.filter(author=victim_obj))

        zip_file = BytesIO()
        with ZipFile(zip_file, 'w') as zip_obj:
            for i, log in enumerate(logs):
                file_name = '_{}_{}_{}'.format(
                    victim_account.username, str(log.created_at), i)
                if log.is_image:
                    file_name = 'image' + file_name
                else:
                    file_name = 'text' + file_name
                zip_obj.writestr(file_name + '_title.txt',
                                 log.title)
                zip_obj.writestr(file_name + '_content.txt',
                                 log.content)
                zip_obj.writestr(file_name + '_key.txt',
                                 log.encrypted_sym_key)

        response = HttpResponse(File(zip_file),
                                content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename="{}-logs.zip"'.format(
            victim_account.username)

        # After downloading, set the status of that request to processed
        requests = list(LogRequest.objects.filter(
            victim=victim_obj).order_by('-created_at'))
        requests[0].has_processed = True
        requests[0].save()

        return response
