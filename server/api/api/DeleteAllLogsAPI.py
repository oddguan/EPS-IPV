from rest_framework import generics, permissions
from rest_framework.response import Response
from api.models import Log, Victim


class DeleteAllLogsAPI(generics.GenericAPIView):
    """
    When user requests to reset the key pair, all old logs
    should be deleted
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        author = Victim.objects.filter(account=request.user)[0]
        Log.objects.filter(author=author).delete()
        return Response(status=200)
