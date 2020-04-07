from django.db import models
from .Account import Account
from .managers import ProviderManager


class Provider(models.Model):
    """
    The provider(shelter worker) database model
    """
    account = models.OneToOneField(Account, on_delete=models.CASCADE, primary_key=True)
    first_name = models.CharField(max_length=30, null=False)
    last_name = models.CharField(max_length=30, null=False)
    email = models.EmailField(max_length=254)
    organization_name = models.CharField(max_length=30, null=False)

    objects = ProviderManager()
