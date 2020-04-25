import random
import base64
from Crypto import Random
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Util.Padding import pad, unpad
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


def encrypt_using_aes(key, content):
    content_encode = content.encode('utf-8')
    iv = Random.new().read(AES.block_size)
    cipher = AES.new(key, AES.MODE_EAX, iv)
    pad_text = pad(content_encode, AES.block_size)
    msg = iv + cipher.encrypt(pad_text)
    return base64.b64encode(msg)


def derypt_using_aes(key, enc_content):
    decodbase64 = base64.b64decode(enc_content)
    iv = decodbase64[:AES.block_size]
    cipher = AES.new(key, AES.MODE_EAX, iv)
    msg = cipher.decrypt(decodbase64[AES.block_size:])
    pad_text = unpad(msg, AES.block_size)
    decryptedString = pad_text.decode('utf-8')
    return decryptedString


def encrypt_content(title, content, public_key):
    """
    takes the unencrypted content and public key of RSA, 
    encrypt the content with a randomly generated AES key, 
    return the encrypted title, content, and the encrypted AES key by using the public_key provided.
    """
    # aes key generation
    key = Random.new().read(AES.block_size)

    encrypted_title = encrypt_using_aes(key, title)
    encrypted_content = encrypt_using_aes(key, content)

    rsa_encryptor = PKCS1_OAEP.new(RSA.importKey(public_key))
    encrypted_sym_key = rsa_encryptor.encrypt(key)

    return encrypted_title, encrypted_content, encrypted_sym_key


def decrypt_content(encrypted_content, encrypted_sym_key, private_key):
    """
    takes the encrypted content, the encrypted symmetric key and private key of RSA,
    use the private key to decrypt the encrypted symmetric key first, then use
    the decrypted symmetric key to decrypt the content. Return decrypted content.
    """
    rsa_decryptor = PKCS1_OAEP.new(RSA.importKey(private_key))
    decrypted_sym_key = rsa_decryptor.decrypt(encrypted_sym_key)

    return decrypt_using_aes(decrypted_sym_key, encrypted_content)
