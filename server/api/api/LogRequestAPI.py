from rest_framework import generics, permissions
from rest_framework.response import Response
from api.models import LogRequest, Victim


class LogRequestAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        victim = Victim.objects.filter(account=request.user)[0]
        new_log_request = LogRequest(victim=victim, has_processed=False)
        new_log_request.save()
        return Response(status=200)
