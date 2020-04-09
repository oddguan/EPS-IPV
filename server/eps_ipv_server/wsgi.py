"""
This file wsgi is a simple calling convention for web servers to forward requests to web applications or frameworks written in the Python programming language. Wsgi is short of Web Server Gateway Interface.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'eps_ipv_server.settings')

application = get_wsgi_application()
