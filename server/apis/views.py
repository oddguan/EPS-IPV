from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated 
from app.models import Users
from apis.serializers import TodoSerializer
from app import models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from apis.serializers import RegistrationSerializer

# Create your views here.


SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

@api_view(['GET', ])
@permission_classes(IsAuthenticated,)
def api_detail_todo_view(request, email):

	try:
		todolist = Todos.objects.get(email=email)
	except:
		return
	if request.method == 'GET':
		serializer = TodoSerializer(todolist)
		return Response(serializer.data)

@api_view(['PUT',])
@permission_classes(IsAuthenticated,)
def api_update_todo_view(request, email):

	try:
		todolist = Todos.objects.get(email=email)
	except:
		return
	
	user = request.user
	if todolist.author != user:
		return Response({'response': "No permissions to edit."})

	if request.method == 'PUT':
		serializer = TodoSerializer(todolist, data=request.data)
		data = {}
		if serializer.is_valid():
			serializer.save()
			data[SUCCESS] = UPDATE_SUCCESS
			return Response(data=data)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE',])
@permission_classes(IsAuthenticated,)
def api_delete_todo_view(request, email):

	try:
		todolist = Todos.objects.get(email=email)
	except:
		return

	user = request.user
	if todolist.author != user:
		return Response({'response': "No permissions to delete."})

	if request.method == 'DELETE':
		operation = todolist.delete()
		data = {}
		if operation:
			data[SUCCESS] = DELETE_SUCCESS
		return Response(data=data)


@api_view(['POST', ])
def registration_view(request):

    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = 'successfully registered new user.'
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user=account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)