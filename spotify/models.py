from django.db import models

# Create your models here.

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length=150) #null=True add to avoid IntegrityConstraint error
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

    #now wiht this model. as soon as i get information I want to store it using model