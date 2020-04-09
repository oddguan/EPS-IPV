'''
This file defines views of the project, which take web requests and return web responses.
Since we are using viewsets defined in other .py files, we don't quite need any view functions in this file. 
'''
from django.db import transaction
from django.shortcuts import render, redirect

