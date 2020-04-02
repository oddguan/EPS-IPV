from django.db import models


class Message(models.Model):
    """
    Message between user and provider database model
    """
    user = models.ForeignKey('Victim', on_delete=models.CASCADE)
    provider = models.ForeignKey('Provider', on_delete=models.CASCADE)
    content = models.TextField(null=False)
    send_time = models.DateTimeField(auto_now_add=True)
    sent_from = models.BooleanField(null=False)

    def __str__(self):
        return self.content

