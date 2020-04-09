'''
This file creates the viewset of a Log, which combines the logic for a set of related views of a log in a single class VictimViewSet.
A ViewSet class is simply a type of class-based View, that does not provide any method handlers such as .get() or .post(), and instead provides actions such as .list() and .create().
'''
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
