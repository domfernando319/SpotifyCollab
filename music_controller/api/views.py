from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
# This is where you write all our endpoints e.g. /hello or /home

# this will show on  the webpage when we hit this endpoint
# we need a request parameter when we create a view
# def main(request):
#     return HttpResponse("<h1>Hello<h1>")

# well how do point the urls to this function? create and go to urls.py

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
