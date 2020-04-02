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
