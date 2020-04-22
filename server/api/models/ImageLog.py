from django.db import models


class ImageLog(models.Model):
    author = models.ForeignKey('Victim', on_delete=models.CASCADE)
    title = models.BinaryField()
    image = models.BinaryField()
    encrypted_sym_key = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
