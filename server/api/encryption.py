from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP
from django.conf import settings
import base64
from .models import Account


def generate_key_pair(username):
    random_generator = Random.new().read
    rsa = RSA.generate(1024, random_generator)
    rsa_private_key = rsa.exportKey()
    rsa_public_key = rsa.key().exportKey()
    new_pk = get_user_model().objects.objects.get(username = username)
    new_pk.value = rsa_public_key
    new_pk.save(['encrypt_pk'])
    return rsa_private_key
