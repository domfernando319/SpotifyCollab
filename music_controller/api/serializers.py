'''
Serializers:
A serializer is a mechanism that converts complex data types, such as querysets 
or model instances, into native Python datatypes. These native types can then be 
easily rendered into JSON, XML, or other content types. 
Serializers also perform the reverse operation, converting incoming data in these
formats back into complex types.

This is useful in building RESTful APIs where you need to
serialize (convert to a format suitable for transmission) and 
deserialize (convert from transmitted format to native data types) 
data when sending and receiving requests.
'''
from rest_framework import serializers
from .models import Room
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')
       