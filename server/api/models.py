from django.db import models


class User(models.Model):
    '''
    The user(victim) database model
    '''
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    hint = models.CharField(max_length=255, null=False)
    encrypt_pk = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.username


class Provider(models.Model):
    '''
    The provider(shelter worker) database model
    '''
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=255, null=False)
    password = models.CharField(max_length=255, null=False)
    hint = models.CharField(max_length=255)
    encrypt_pk = models.CharField(max_length=255, null=False)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


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


class Message(models.Model):
    '''
    Message between user and provider database model
    '''
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    provider = models.ForeignKey('Provider', on_delete=models.CASCADE)
    content = models.TextField(null=False)
    send_time = models.DateTimeField(auto_now_add=True)
    sent_from = models.BooleanField(null=False)

    def __str__(self):
        return self.content


class Location(models.Model):
    '''
    Shelter location database model
    '''
    admin = models.ForeignKey('Provider', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=False)
    logitude = models.DecimalField(max_digits=20, decimal_places=6)
    latitude = models.DecimalField(max_digits=20, decimal_places=6)
    address = models.CharField(max_length=255, null=False)

    def __str__(self):
        self.name
