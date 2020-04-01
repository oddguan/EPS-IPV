from django.contrib import admin
from api.models import (
    User,
    Provider,
    Post,
    Log,
    Message,
    Location
)

admin.site.register(User)
admin.site.register(Provider)
admin.site.register(Post)
admin.site.register(Log)
admin.site.register(Message)
admin.site.register(Location)