
'''
This file creates the model of Post, which maps to the post table in the mysql database. 
The model Provider contains four attributes: author, title, content, and created time. 
'''
from django.db import models

class Post(models.Model):
    '''
    The education post by provider database model
    '''
    author = models.ForeignKey('Provider', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False)
    content = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{}".format(self.title)
