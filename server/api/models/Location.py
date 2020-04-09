'''
This file creates the model of Location, which maps to the location table in the mysql database. 
The model Location contains five attributes: administrator, location name, location logitude, location latitude, and location physical address. 
'''
from django.db import models

class Location(models.Model):
    """
    Shelter location database model
    """
    admin = models.ForeignKey('Provider', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=False)
    logitude = models.DecimalField(max_digits=20, decimal_places=6)
    latitude = models.DecimalField(max_digits=20, decimal_places=6)
    address = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name
