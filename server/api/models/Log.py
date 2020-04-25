'''
This file creates the model of Log, which maps to the log table in the mysql database. 
The model Log contains four attributes: author, title, content, and created time.  
'''
from django.db import models


class Log(models.Model):
    """
    Secure logs from victims database model
    """
    author = models.ForeignKey('Victim', on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    encrypted_sym_key = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_image = models.BooleanField(default=False)

    def __str__(self):
        return self.title
