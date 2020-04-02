from rest_framework import viewsets, permissions
from api.models import Victim
from api.serializers import VictimSerializer


class VictimViewSet(viewsets.ModelViewSet):
    queryset = Victim.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = VictimSerializer
