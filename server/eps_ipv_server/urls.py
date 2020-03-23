
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings


from users.api.views import (
    registration_view,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', registration_view, name="register"),
    
    # REST-framework
    path('api/todos/', include('todos.api.urls', 'todos_api')),
    path('api/users/', include('users.api.urls', 'users_api'))
    ]