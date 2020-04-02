from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class VictimManager(BaseUserManager):
    def create_victim(self, account_id, **extra_fields):
        if not id:
            raise ValueError(_('need id to create victim'))
        victim = self.model(account_id=account_id, **extra_fields)
        victim.is_victim = True
        victim.save()
        return victim
