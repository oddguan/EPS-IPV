from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from users.models import Users


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required. Add a valid email address.')

    class Meta:
        model = Users
        fields = ('firstname', 'lastname', 'email', 'username', 'password', )


class AccountAuthenticationForm(forms.ModelForm):

	password = forms.CharField(label='Password', widget=forms.PasswordInput)

	class Meta:
		model = Users
		fields = ('email', 'password')

	def clean(self):
		if self.is_valid():
			email = self.cleaned_data['email']
			password = self.cleaned_data['password']
			if not authenticate(email=email, password=password):
				raise forms.ValidationError("Invalid login")


class AccountUpdateForm(forms.ModelForm):

	class Meta:
		model = Users
		fields = ('email', 'username', )

	def clean_email(self):
		email = self.cleaned_data['email']
		try:
			user = Users.objects.exclude(pk=self.instance.pk).get(email=email)
		except Users.DoesNotExist:
			return email
		raise forms.ValidationError('Email "%s" is already in use.' % user)

	def clean_username(self):
		username = self.cleaned_data['username']
		try:
			user = Users.objects.exclude(pk=self.instance.pk).get(username=username)
		except Users.DoesNotExist:
			return username
		raise forms.ValidationError('Username "%s" is already in use.' % username)


