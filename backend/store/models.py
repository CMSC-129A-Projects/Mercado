from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class Product(models.Model):
    Seller = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_product_seller' verbose_name=_("Seller"), on_delete=models.CASCADE)
    Name = models.CharField(_("Product Name"), max_length=100)
