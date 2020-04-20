from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP
from django.conf import settings
import base64
from .models import Account


def generate_key_pair():
    random_generator = Random.new().read
    rsa = RSA.generate(1024, random_generator)
    rsa_private_key = rsa.exportKey()
    rsa_public_key = rsa.key().exportKey()

    return Response('publicKey': rsa_public_key)

def decrypt():
    random_generator = Random.new().read
    RSA.generate(1024, random_generator)
    rsakey = RSA.importKey(settings.RSA_PRIVATE_KEY) 
    cipher = PKCS1_v1_5.new(rsakey) 
    password = cipher.decrypt(base64.b64decode(password), random_generator)

    return 