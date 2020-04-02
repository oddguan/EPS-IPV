from django.db import models


class User(models.Model):
    '''
    The user(victim) database model
    '''
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    hint = models.CharField(max_length=255, null=False)
    encrypt_pk = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.username
