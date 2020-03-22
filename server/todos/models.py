from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

# Create your models here.


class Todos(models.Model):
	title = models.CharField(max_length=50, null=False, blank=False)
	compete = models.BooleanField(default=False)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title

@receiver(post_delete, sender=Todos)
def submission_delete(sender, instance, **kwargs):
	instance.image.delete(False)