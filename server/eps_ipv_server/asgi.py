"""
This file is the ASGI config for eps_ipv_server project.
ASGI (Asynchronous Server Gateway Interface) is a spiritual successor to WSGI, intended to provide a standard interface between async-capable Python web servers, frameworks, and applications.
"""

import os
from channels.asgi import get_channel_layer
#import channels.asgi
#from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eps_ipv_server.settings')

channel_layer = get_channel_layer()
#application = get_asgi_application()

