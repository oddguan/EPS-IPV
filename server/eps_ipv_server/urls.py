
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static
from django.conf import settings

from users.views import (
    registration_view,
    logout_view,
    login_view,
    users_view,
)

urlpatterns = [
    #path('', , name="home"),
    path('admin/', admin.site.urls),
    path('users/', users_view, name="users"),
    path('todos/', include('todos.api.urls', 'todos')),
    path('login/', login_view, name="login"),
    path('logout/', logout_view, name="logout"),
    path('register/', registration_view, name="register"),
	
	# REST-framework
    path('api/todos/', include('todos.api.urls', 'todo_api')),
    path('api/users/', include('users.api.urls', 'user_api')),

]