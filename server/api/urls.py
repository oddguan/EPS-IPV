from django.urls import path
from rest_framework import routers
from .api import VictimViewSet, PostViewSet
from api.api.auth import VictimRegisterAPI


router = routers.DefaultRouter()

router.register(r'user', VictimViewSet)
router.register(r'post', PostViewSet)

urlpatterns = [
    path(r'auth/register/victim', VictimRegisterAPI.as_view(), name='register victim account')
]

urlpatterns += router.urls
