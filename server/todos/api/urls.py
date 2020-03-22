from django.urls import path
from todos.views import ListTodo
app_name = 'todos'

urlpatterns = [
	path('create/', create_blog_view, name="create"),
]