from api.models import Victim, Provider, Account


def get_user_detail_dict(account: Account) -> dict:
    response_dict = {
        "is_victim": account.is_victim,
        "is_provider": account.is_provider,
        "username": account.username,
        "id": account.id
    }
    if account.is_victim:
        user = Victim.objects.filter(account=account)[0]
    else:  # account.is_provider
        user = Provider.objects.filter(account=account)[0]
        response_dict['organization'] = user.org_name

    response_dict['first_name'] = user.first_name
    response_dict['last_name'] = user.last_name
    response_dict['phonenumber'] = user.phonenumber
    response_dict['email'] = user.email

    return response_dict
