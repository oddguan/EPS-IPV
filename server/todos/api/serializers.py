from rest_framework import serializers
from todos import models


class TodoSerializer(serializers.ModelSerializer):


	class Meta:
		fields = (
			'title',
			'complete',
			'created',
		)
		model = models.Todos
