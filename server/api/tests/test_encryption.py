import base64
from Crypto import Random
from Crypto.Cipher import AES
from django.test import TestCase

from api.encryption import decrypt_content, encrypt_content, generate_key_pair, encrypt_using_aes, derypt_using_aes


class EncryptionTestCase(TestCase):

    def test_aes(self):
        key = Random.new().read(AES.block_size)
        content = 'this is a test content \n'
        enc_content = encrypt_using_aes(key, content)
        dec_content = derypt_using_aes(key, enc_content)

        self.assertEqual(content, dec_content)

    def test_image_encryption(self):
        private_key, public_key = generate_key_pair()
        test_title = 'random test title'
        image_stream = b'assume this is an image read from a jpeg file'
        image_encoded = base64.b64encode(image_stream).decode('ascii')
        assert type(image_encoded) is str
        enc_title, enc_image, enc_sym_key = encrypt_content(
            test_title, image_encoded, public_key)

        # decryption process
        dec_image = decrypt_content(enc_image, enc_sym_key, private_key)
        self.assertEqual(image_stream, base64.b64decode(dec_image))

    # def test_decrypt_content(self):
    #     private_key, public_key = generate_key_pair()

    #     title = 'test title'
    #     content = 'test content'

    #     enc_title, enc_content, enc_sym_key = encrypt_content(
    #         title, content, public_key)

    #     dec_title = decrypt_content(enc_title, enc_sym_key, private_key)
    #     dec_content = decrypt_content(enc_content, enc_sym_key, private_key)

    #     self.assertEqual(title, dec_title.decode())
    #     self.assertEqual(content, dec_content.decode())
