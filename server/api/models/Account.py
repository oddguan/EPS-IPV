'''
This file creates the model of Account, which maps to the user table in the mysql database. 
The model Account contains five attributes: username, hint, encryption public key, whether victim, and whether provider. 
'''
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from .managers import AccountManager


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, null=False, unique=True)
    hint = models.CharField(max_length=250, null=False)
    encrypt_pk = models.BinaryField(null=True)
    is_victim = models.BooleanField('victim status', default=False)
    is_provider = models.BooleanField('provider status', default=False)

    USERNAME_FIELD = 'username'

    objects = AccountManager()

    def __str__(self):
        return self.username
