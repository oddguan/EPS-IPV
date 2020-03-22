from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from users.models import Users
from todos.models import Todos
from todos.api.serializers import TodoSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

@api_view(['GET', ])
def api_detail_todo_view(request, slug):

	try:
		todolist = Todos.objects.get(slug=slug)

	if request.method == 'GET':
		serializer = TodoSerializer(todolist)
		return Response(serializer.data)


@api_view(['PUT',])
def api_update_todo_view(request, slug):

	try:
		todolist = Todos.objects.get(slug=slug)
	
	if request.method == 'PUT':
		serializer = TodoSerializer(todolist, data=request.data)
		data = {}
		if serializer.is_valid():
			serializer.save()
			data[SUCCESS] = UPDATE_SUCCESS
			return Response(data=data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE',])
def api_delete_todo_view(request, slug):

	try:
		todolist = Todos.objects.get(slug=slug)

	if request.method == 'DELETE':
		operation = todolist.delete()
		data = {}
		if operation:
			data[SUCCESS] = DELETE_SUCCESS
		return Response(data=data)


@api_view(['POST'])
def api_create_list_view(request):

	account = Account.objects.get(pk=1)

	todolist = Todos(author=account)

	if request.method == 'POST':
		serializer = TodoSerializer(todolist, data=request.data)
		data = {}
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

