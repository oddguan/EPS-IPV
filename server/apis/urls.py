from django.urls import path
from apis.views import registration_view


#urlpatterns = [
#    path('', ListTodo.as_view()),
#    path('<int:pk>/', DetailTodo.as_view()),
#]

#from todos.api.views import (
#	api_detail_todo_view,
#	api_update_todo_view,
#	api_delete_todo_view,
#	)
#from users.api.views import(
#	registration_view,
#)
#from rest_framework.authtoken.views import obtain_auth_token

#app_name = 'todos'
#app_name = 'users'

#urlpatterns = [
#	path('<email>/', api_detail_todo_view, name="email"),
#	path('<email>/update', api_update_todo_view, name="update"),
#	path('<email>/delete', api_delete_todo_view, name="delete"),

#]

urlpatterns = [
	path('register', registration_view, name="register"),
]