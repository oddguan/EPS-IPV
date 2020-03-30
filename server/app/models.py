from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

# Create your models here.
class Users(models.Model):
	Userid = models.CharField(max_length=10, null=False, primary_key=True)
	Username = models.CharField(max_length=255,null=False)
	Password = models.CharField(max_length=255,null=False)
	Hint = models.CharField(max_length=255)
	EncryptPK = models.CharField(max_length=255,null=False)

	def __str__(self):
		return self.Username



class Providers(models.Model):
	Providerid = models.CharField(max_length=10, null=False, primary_key=True)
	Username = models.CharField(max_length=255,null=False)
	Password = models.CharField(max_length=255,null=False)
	Hint = models.CharField(max_length=255)
	EncryptPK = models.CharField(max_length=255,null=False)

	def __str__(self):
		return self.Username

class Posts(models.Model):
	Postid = models.CharField(max_length=10, null=False, primary_key=True)
	Userid = models.CharField(max_length=10, null=False)
	Title = models.CharField(max_length=255,null=False)
	Content = models.CharField(max_length=255,null=False)
	Createtime = models.DateTimeField(auto_now_add=True)
	Uoploadtime = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.Postid

class Logs(models.Model):
	Logid = models.CharField(max_length=10, null=False, primary_key=True)
	Userid = models.CharField(max_length=10, null=False)
	Title = models.CharField(max_length=255,null=False)
	Content = models.CharField(max_length=255,null=False)
	Createtime = models.DateTimeField(auto_now_add=True)
	Uoploadtime = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.Userid

class Messages(models.Model):
	Msgid = models.CharField(max_length=10, null=False, primary_key=True)
	Userid = models.CharField(max_length=10, null=False)
	Providerid = models.CharField(max_length=10, null=False)
	Content = models.CharField(max_length=255,null=False)
	Sendtime = models.DateTimeField(auto_now_add=True)
	Imageid = models.CharField(max_length=255, null=False)

	def __str__(self):
		return self.Msgid

class Locations(models.Model):
	Locationid = models.CharField(max_length=10, null=False, primary_key=True)
	Adminid = models.CharField(max_length=10, null=False)
	Logitude = models.DecimalField(max_digits=20, decimal_places=6)
	Logitude = models.DecimalField(max_digits=20, decimal_places=6)
	Address = models.CharField(max_length=255, null=False)

	def __str__(self):
		return self.Locationid



#@receiver(post_delete, sender=Todos)
#def submission_delete(sender, instance, **kwargs):
#	instance.image.delete(False)