from rest_framework import serializers
from app import models
from app.models import Users

class TodoSerializer(serializers.ModelSerializer):


	class Meta:
		fields = (
			'Title',
			'Content',
			'Createtime',
		)
		model = models.Posts


# class LoginSerializer(serializers.ModelSerializer):
#   class Meta:
#       model = Users
#       fields = ['email', 'password',]

#       extra_kwargs = {'password': {'write_only': True}}

#   def validate(self, data):
#       password = data.get('password')
#       email = data.get('email')


class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ['firstname', 'lastname', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }   


    def save(self):

        account = Account(
                    firstname=self.validated_data['firstname'],
                    lastname=self.validated_data['lastname'],
                    email=self.validated_data['email'],
                    username=self.validated_data['username'],
                    password=self.validated_data['password']
                )
        account.save()
        return account
