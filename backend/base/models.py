from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Anime(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="animes"
    )
    json_data = models.JSONField(null=True, blank=True)
    mal_id = models.IntegerField(unique=True, default=0)
