from django.urls import path
from rest_framework import routers
from .api import VictimViewSet, PostViewSet, LogViewSet
from api.api.auth import VictimRegisterAPI, LoginAPI


router = routers.DefaultRouter()

router.register(r'user', VictimViewSet, basename='user')
router.register(r'post', PostViewSet, basename='post')
router.register(r'log', LogViewSet, basename='log')

urlpatterns = [
    path(r'auth/register/victim', VictimRegisterAPI.as_view(),
         name='register victim account'),
    path(r'auth/login', LoginAPI.as_view(), name='login')
]

urlpatterns += router.urls
