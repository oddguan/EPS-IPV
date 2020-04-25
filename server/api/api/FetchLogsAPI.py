from rest_framework import generics, permissions
from rest_framework.response import Response
from api.serializers import FetchLogResponseSerializer
from api.models import Log, Victim


class FetchLogsAPI(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        victim = Victim.objects.filter(account=request.user)[0]
        logs = Log.objects.filter(author=victim)
        result = []
        for log in logs:
            result.append({
                "is_image": log.is_image,
                "created_at": log.created_at
            })

        return Response(FetchLogResponseSerializer(result, many=True).data, status=200)
