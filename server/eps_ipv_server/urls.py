'''
This file organizes all urls within the Django framework. 
The core part is the urlpattern tuple, which defines the mapping between URLs and views defined in the view.py.
The other large part is the schema_view function of REST framework, which links the Django backend with the React frontend.
The schema_view comes from the get_schema_view function, which makes it easier to adding schema views to the API.
'''
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
    openapi.Info(
        title="EPS IPV API Documentation",
        default_version='v1',
        description="This is the backend API Documentation of the Intimate Partner Violence Project",
        contact=openapi.Contact(email="chenxiag@andrew.cmu.edu"),
        license=openapi.License(name="MIT"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    url(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]