'''
This file is created to include the application api configuration. Doing this will allow api to be used when INSTALLED_APPS contains 'api'. This allows developers to make use of AppConfig features without requiring users to update their INSTALLED_APPS setting.
'''
from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'api'
