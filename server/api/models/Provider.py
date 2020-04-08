from django.db import models
from django.contrib.auth import get_user_model

from .Account import Account
from .managers import ProviderManager


class Provider(models.Model):
    """
    The provider(shelter worker) database model
    """
    account = models.OneToOneField(
        get_user_model(), on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    email = models.EmailField(max_length=254, null=False)
    org_name = models.CharField(max_length=30, null=False)
    phonenumber = models.CharField(max_length=30, null=True)

    objects = ProviderManager()
