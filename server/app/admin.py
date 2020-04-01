from django.contrib import admin
from app.models import Logs, Posts, Messages, Locations, Users, Providers

# Register your models here.

class EducationAdmin(admin.ModelAdmin):
	list_display = ('Fullname', 'Title', 'Content')

class LogsAdmin(admin.ModelAdmin):
	list_display = ('Userid', 'Title', 'Content')

admin.site.register(Users)
admin.site.register(Providers)
admin.site.register(Logs, LogsAdmin)
admin.site.register(Posts, EducationAdmin)
admin.site.register(Messages)
admin.site.register(Locations)

