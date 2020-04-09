'''
This manage.py is automatically created in the Django project. 
This file is to register created models so as to perform related operations.
In this file, all created models including victim, provider, and post are registered. 
'''
from django.contrib import admin
from api.models import (
    Victim,
    Provider,
    Post,
    Log,
    Message,
    Location
)

admin.site.register(Victim)
admin.site.register(Provider)
admin.site.register(Post)
admin.site.register(Log)
admin.site.register(Message)
admin.site.register(Location)
