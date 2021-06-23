from .base import *

DEBUG = config('DEBUG', cast=bool)

# ALLOWED_HOSTS = ['ip-address', 'wwww.the-website.com']
ALLOWED_HOSTS = ['*']

DATABASES = {
    
}