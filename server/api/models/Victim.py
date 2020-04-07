from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from .Account import Account
from .managers import VictimManager


class Victim(AbstractBaseUser):
    """
    The user(victim) database model
    """
    account = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    phone_number = models.CharField(max_length=30, null=False)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    
    objects = VictimManager()
