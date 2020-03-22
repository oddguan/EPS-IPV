from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Create your models here.


class MyUserManager(BaseUserManager):
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

