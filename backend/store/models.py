from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

class Product(models.Model):
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_product_seller', verbose_name=_("Seller"), on_delete=models.CASCADE)
    product_name = models.CharField(_("Product Name"), max_length=100)
    image_url = models.CharField(_("Images"), max_length=255)
    price = models.DecimalField(_("Price"), max_digits=5, decimal_places=2)
    description = models.TextField(_("Description"))
    slug = models.SlugField(_("Slug"), max_length=50)
    is_available = models.BooleanField(_("Is Available"), default=True)
    created_at = models.DateTimeField(_("Timestamp Created"), auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(_("Timestamp Updated"), auto_now=True, auto_now_add=False)


class ProductReview(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_review_author', verbose_name=_("Author"), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='%(class)s_review_product', verbose_name=_("Product"), on_delete=models.CASCADE)
    rating = models.DecimalField(_("Rating"), max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0)
    content = models.TextField(_("Content"))
    image_url = models.CharField(_("Images"), max_length=255)
    slug = models.SlugField(_("Slug"), max_length=50)
    created_at = models.DateTimeField(_("Timestamp Created"), auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(_("Timestamp Updated"), auto_now=True, auto_now_add=False)


