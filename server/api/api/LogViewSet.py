from rest_framework import viewsets, permissions
from rest_framework.response import Response
from api.models import Log
from api.serializers import LogSerializer


class LogViewSet(viewsets.ModelViewSet):
    queryset = Log.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LogSerializer

    def list(self, request):
        print(request.user.username)
        try:
            logs = list(Log.objects.filter(account=request.user.id))
        except:
            logs = []
        serializer = LogSerializer(logs, many=True)
        return Response(serializer.data)
