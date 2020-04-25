from django.test import TestCase
from api.encryption import decrypt_content, encrypt_content, generate_key_pair, encrypt_using_aes, derypt_using_aes


class EncryptionTestCase(TestCase):

    def test_aes(self):
        content = 'this is a test content \n'
        enc_content, key = encrypt_using_aes(content)
        dec_content = derypt_using_aes(key, enc_content)

        self.assertEqual(content, dec_content)

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
