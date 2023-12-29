from django.db import models
import string 
import random

# Create your models here.
# Everytime we modify models we have to make migrations: python .\manage.py makemigrations
# what is a model: how db is structured. aka table. it is a layer of abstraction for database
# Rule for Django models: Fat models, Thin views. 

def generate_unique_code():
    length = 6

    while True:
        #generate a random code of k length using uppercase ascii characters
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break # then were good and return code. else keep generating codes
    
    return code


class Room(models.Model):
    # define fields for each room. Table attributes with constraints

    # unique code that identifies the room
    code = models.CharField(max_length=8, default=generate_unique_code, unique=True)

    # each room will have a host
    host = models.CharField(max_length=50, unique=True)

    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True) # this means we never have to pass datetime to object

    ### Now add some methods 


    