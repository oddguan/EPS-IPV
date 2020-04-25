'''
This file organizes all urls for the api application.  
The core part is the urlpattern tuple, which defines the mapping between URLs and views defined in the view.py.
This file registers viewsets of victim, posts, and logs through routers. 
'''
from django.urls import path
from rest_framework import routers
from .api import VictimViewSet, PostViewSet
from api.api.auth import VictimRegisterAPI, ProviderRegisterAPI, LoginAPI, UserDetailAPI
from api.api import (
    ImageUploadAPI,
    ImageViewAPI,
    KeyGenerateAPI,
    AddTextLogAPI,
    AddImageLogAPI,
    LogRequestAPI,
    RetrieveAllLogsAPI,
    DownloadLogAPI,
    DeleteAllLogsAPI,
    FetchLogsAPI
)


router = routers.DefaultRouter()

router.register(r'user', VictimViewSet, basename='user')
router.register(r'post', PostViewSet, basename='post')

urlpatterns = [
    path(r'auth/register/victim', VictimRegisterAPI.as_view(),
         name='register victim account'),
    path(r'auth/register/provider', ProviderRegisterAPI.as_view(),
         name='register provider account'),
    path(r'auth/login', LoginAPI.as_view(), name='login'),
    path(r'auth/user', UserDetailAPI.as_view(), name='user-detail'),
    path(r'generate-key/', KeyGenerateAPI.as_view(), name='generate-key'),
    path(r'log/text/', AddTextLogAPI.as_view(), name='new-text-log'),
    path(r'log/image/', AddImageLogAPI.as_view(), name='new-image-log'),
    path(r'log/request/', LogRequestAPI.as_view(), name='request-physical-logs'),
    path(r'image/<str:image_name>/', ImageUploadAPI.as_view(), name='image-upload'),
    path(r'image/view/<str:image_key>/',
         ImageViewAPI.as_view(), name='image-view'),
    path(r'log/request/all/', RetrieveAllLogsAPI.as_view(),
         name='retrieve-all-logs'),
    path(r'log/request/download/<str:victim_username>/',
         DownloadLogAPI.as_view(), name='download-log-files'),
    path(r'log/delete/all/', DeleteAllLogsAPI.as_view(), name='delete-all-logs'),
    path(r'log/', FetchLogsAPI.as_view(), name='fetch-all-logs')
]

urlpatterns += router.urls
