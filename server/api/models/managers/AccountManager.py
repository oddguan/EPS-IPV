from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class AccountManager(BaseUserManager):
    def create_account(self, username, password, hint, **extra_fields):
        if not username:
            raise ValueError(_('Account username has to be provided'))
        if not password:
            raise ValueError(_('Account password cannot be empty'))

        account = self.model(username=username, hint=hint, **extra_fields)
        account.set_password(password)
        account.save()
        return account
