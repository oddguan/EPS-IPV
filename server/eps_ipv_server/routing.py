"""This file is a part of Django Channels, which is to create communications between a victim and a help provider. 
In Django Channels, this rouing.py file links consumer functions to WebSockets by mapping the url with the consumer function. 
"""
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.conf.urls import url
from . import consumers

websocket_urlpatterns = [
    url(r'^ws/chat$', consumers.ChatController),
]

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
