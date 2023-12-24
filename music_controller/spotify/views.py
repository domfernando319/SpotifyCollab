from django.shortcuts import render, redirect
from .credentials import REDIRECT_URI, CLIENT_ID, CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request, post
from rest_framework.response import Response
from rest_framework import status
from .util import update_or_create_user_tokens, is_spotify_authenticated, get_user_tokens
from api.models import Room
# Create your views here.

class AuthURL(APIView):
    def get(self, request, format=None):
        scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'

        url = Request('GET', 'https://accounts.spotify.com/authorize', params={
            'scope': scopes,
            'response_type': 'code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID
        }).prepare().url

        return Response({'url': url}, status=status.HTTP_200_OK)

# this api endpoint essentially provides us a way to authenticate on the app 

def spotify_callback(request, format=None):
    code = request.GET.get('code')
    error = request.GET.get('error')

    # send another request to get token
    response = post('https://accounts.spotify.com/api/token', data={
        "grant_type": 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    refresh_token = response.get('refresh_token')
    expires_in = response.get('expires_in')
    error = response.get('error')

    # now that we have the access and refresh token we need to store 
    # this information in the database -> Enter Models
    # new session means new access and refresh tokens
    if not request.session.exists(request.session.session_key):
        request.session.create()
    
    update_or_create_user_tokens(request.session.session_key, access_token, token_type, expires_in, refresh_token)

    return redirect('frontend:') #dont need endpoint bc we go to home page
    #from spotify application you specify frontend app (our app) and the endpoint to redirect to


# Just an endpoint you can hit to see whether or not user is authenticated
class IsAuthenticated(APIView):
    def get(self, request, format=None):
        is_authenticated = is_spotify_authenticated(self.request.session.session_key)
        return Response({'auth_status': is_authenticated}, status=status.HTTP_200_OK)