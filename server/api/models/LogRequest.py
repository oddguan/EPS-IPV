from django.db import models


class LogRequest(models.Model):
    """
    Stores all requests from all victims for retrieving logs
    """
    victim = models.ForeignKey('Victim', on_delete=models.CASCADE)
    has_processed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
