from django import forms

from blog.models import Todos


class CreateTodoForm(forms.ModelForm):

	class Meta:
		model = Todos
		fields = ['title', 'compete', 'created']

