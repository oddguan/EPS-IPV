'''
This file organizes all urls for the api application.  
The core part is the urlpattern tuple, which defines the mapping between URLs and views defined in the view.py.
This file registers viewsets of victim, posts, and logs through routers. 
'''
from django.urls import path
from rest_framework import routers
from .api import VictimViewSet, PostViewSet, LogViewSet
from api.api.auth import VictimRegisterAPI, ProviderRegisterAPI, LoginAPI, UserDetailAPI
from api.api import ImageUploadAPI


router = routers.DefaultRouter()

router.register(r'user', VictimViewSet, basename='user')
router.register(r'post', PostViewSet, basename='post')
router.register(r'log', LogViewSet, basename='log')

urlpatterns = [
    path(r'auth/register/victim', VictimRegisterAPI.as_view(),
         name='register victim account'),
    path(r'auth/register/provider', ProviderRegisterAPI.as_view(),
         name='register provider account'),
    path(r'auth/login', LoginAPI.as_view(), name='login'),
    path(r'auth/user', UserDetailAPI.as_view(), name='user-detail'),
    path(r'image', ImageUploadAPI.as_view(), name='image-upload')
]

urlpatterns += router.urls
