from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.


class MyAccountManager(BaseUserManager):
	def create_user(self, firstname, lastname, email, username, password):
		if not email:
			raise ValueError('Users must have an email address')
		if not username:
			raise ValueError('Users must have a username')

		user = self.model(
			email=self.normalize_email(email),
			username=username,
		)

		user.set_password(password)
		user.save(using=self._db)
		return user



class Users(AbstractBaseUser):
	firstname = models.CharField(max_length=10, null=False)
	lastname = models.CharField(max_length=10, null=False)
	email = models.EmailField(verbose_name="email", max_length=60, blank=False, unique=True)
	username = models.CharField(max_length=20,null=False)
	password = models.CharField(max_length=20,null=False)

	objects = MyAccountManager()

	def __str__(self):
		return self.email


	# Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
	def has_module_perms(self, app_label):
		return True



		
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
