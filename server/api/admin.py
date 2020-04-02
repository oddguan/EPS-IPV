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
