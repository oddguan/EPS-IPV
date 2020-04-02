from django.db import models


class Provider(models.Model):
    '''
    The provider(shelter worker) database model
    '''
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    hint = models.CharField(max_length=255)
    encrypt_pk = models.CharField(max_length=255, null=False)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
