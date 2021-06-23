from .base import *

DEBUG = config('DEBUG', cast=bool)

# ALLOWED_HOSTS = ['ip-address', 'wwww.the-website.com']
ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}