'''
This file creates the model of Message, which maps to the message table in the mysql database. 
The model Provider contains five attributes: user, provider, content, sent time, and whether sent.
Also, there are two functions related to the model, one allows users to view recent 20 messages and the other checks whether the message is empty.  
'''
from django.db import models
from django.core.exceptions import ValidationError


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

def last_20_messages():
        return Message.objects.order_by('-created_at').all()[:20]

def validate_message_content(content):
    if content is None or content == "" or content.isspace():
        raise ValidationError(
            'Content is empty/invalid',
            code='invalid',
            params={'content': content},
        )