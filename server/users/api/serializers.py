from rest_framework import serializers
from users.models import Account


# class LoginSerializer(serializers.ModelSerializer):
#   class Meta:
#       model = Account
#       fields = ['email', 'password',]

#       extra_kwargs = {'password': {'write_only': True}}

#   def validate(self, data):
#       password = data.get('password')
#       email = data.get('email')


class RegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['firstname', 'lastname', 'username', 'email', 'password']
        extra_kwargs = {
                'password': {'write_only': True},
        }   


    def save(self):

        account = Account(
                    firstname=self.validated_data['firstname'],
                    lastname=self.validated_data['lastname'],
                    email=self.validated_data['email'],
                    username=self.validated_data['username']
                )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account
