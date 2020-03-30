from django.contrib import admin
from app.models import Logs, Posts, Messages, Locations

admin.site.register(Logs)
admin.site.register(Posts)
admin.site.register(Messages)
admin.site.register(Locations)

# Register your models here.
