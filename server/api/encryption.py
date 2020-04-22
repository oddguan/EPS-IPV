import random
from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from django.conf import settings
from .models import Account


def generate_key_pair():
    """
    generate RSA key pair.
    """
    random_generator = Random.new().read
    rsa = RSA.generate(1024, random_generator)
    private_key = rsa.export_key('PEM')
    public_key = rsa.publickey().export_key('PEM')
    return private_key, public_key


def encrypt_content(title, content, public_key):
    """
    takes the unencrypted content and public key of RSA, 
    encrypt the content with a randomly generated AES key, 
    return the encrypted title, content, and the encrypted AES key by using the public_key provided.
    """
    key = Random.new().read(AES.block_size)
    cipher = AES.new(key, AES.MODE_EAX)
    encrypted_title = cipher.encrypt_and_digest(
        bytes(title, encoding='utf8'))[0]
    cipher = AES.new(key, AES.MODE_EAX)
    if type(content) is str:
        content = bytes(content, encoding='utf8')
    encrypted_content = cipher.encrypt_and_digest(content)[0]
    rsa_encryptor = PKCS1_OAEP.new(RSA.importKey(public_key))
    encrypted_sym_key = rsa_encryptor.encrypt(key)

    return (encrypted_title, encrypted_content, encrypted_sym_key)


def decrypt_content(encrypted_content, encrypted_sym_key, private_key):
    """
    takes the encrypted content, the encrypted symmetric key and private key of RSA,
    use the private key to decrypt the encrypted symmetric key first, then use
    the decrypted symmetric key to decrypt the content. Return decrypted content.
    """
    decryptor = PKCS1_OAEP.new(keyPair)
    cipher = AES.new(key, AES.MODE_EAX)
    # TODO: Finish this. Currently don't know how to form an RSA key object from both public and private keys
