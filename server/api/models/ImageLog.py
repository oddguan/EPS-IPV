from django.db import models
from api.utils import Base64Field


class ImageLog(models.Model):
    author = models.ForeignKey('Victim', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False)
    encrypted_image = Base64Field(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
