from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP
from django.conf import settings
import base64
from .models import Account


def generate_key_pair():
    random_generator = Random.new().read
    rsa = RSA.generate(1024, random_generator)
    private_key = rsa.export_key('PEM')
    public_key = rsa.publickey().export_key('PEM')
    return private_key, public_key
