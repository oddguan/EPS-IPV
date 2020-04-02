from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class ProviderManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError(_('Username has to be provided'))
        if not password:
            raise ValueError(_('Password cannot be empty'))

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.is_provider = True
        user.save()
        return user
