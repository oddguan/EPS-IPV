'''
This file creates the model of Victim, which maps to the victim table in the mysql database. 
The model Victim contains five attributes: account, firstname, lastname, phonenumber, and email. 
'''
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth import get_user_model

from .managers import VictimManager


class Victim(AbstractBaseUser):
    """
    The user(victim) database model:
    """
    account = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    phonenumber = models.CharField(max_length=30, null=True, blank=True)
    email = models.EmailField(max_length=50, null=True, blank=True)pub_key = models.CharField(max_length=255, null=True)

    objects = VictimManager()
