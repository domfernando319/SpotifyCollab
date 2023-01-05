from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
# This is where you write all our endpoints e.g. /hello or /home

# this will show on  the webpage when we hit this endpoint
def main(request):
    return HttpResponse("<h1>Hello<h1>")

