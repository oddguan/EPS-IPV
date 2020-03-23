from django.urls import path
from todos.api.views import (
	api_detail_todo_view,
	api_update_todo_view,
	api_delete_todo_view,
	)

app_name = 'todos'

urlpatterns = [
	path('<email>/', api_detail_todo_view, name="email"),
	path('<email>/', api_update_todo_view, name="email"),
	path('<email>/', api_delete_todo_view, name="email"),

]