'''
This file creates the viewset of a victim, which combines the logic for a set of related views of a victim in a single class VictimViewSet.
A ViewSet class is simply a type of class-based View, that does not provide any method handlers such as .get() or .post(), and instead provides actions such as .list() and .create().
'''
from rest_framework import viewsets, permissions
from api.models import Victim
from api.serializers import VictimSerializer


class VictimViewSet(viewsets.ModelViewSet):
    queryset = Victim.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = VictimSerializer
