from django.db import models


class Location(models.Model):
    '''
    Shelter location database model
    '''
    admin = models.ForeignKey('Provider', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=False)
    logitude = models.DecimalField(max_digits=20, decimal_places=6)
    latitude = models.DecimalField(max_digits=20, decimal_places=6)
    address = models.CharField(max_length=255, null=False)

    def __str__(self):
        self.name
