from django.db import models


class Log(models.Model):
    '''
    Secure logs from victims database model
    '''
    author = models.ForeignKey('User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255, null=False)
    content = models.TextField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
