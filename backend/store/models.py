from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
from django.urls import reverse


class Category(models.Model):
    name = models.CharField(_('category name'), max_length=255, db_index=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name_plural = 'categories'

    def get_absolute_url(self):
        return reverse('store:category-list', kwargs={'slug': self.slug})

    def __str__(self):
        return self.name
    

class Product(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('products'), on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    desc = models.TextField(_('description'), blank=True, null=True)
    price = models.FloatField()
    disc_price = models.FloatField(_('discounted price'), blank=True, null=True, default=0)
    categories = models.ManyToManyField(Category, related_name=_('product_categories'), blank=True)
    in_stock = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['-created_at']

    def get_absolute_url(self):
        return reverse('store:product-detail', args=[self.pk])

    def __str__(self):
        return self.name
    

def product_image_path(instance, filename):
    return 'user_{0}/{1}'.format(instance.user.id, filename)


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name=_('image_product'), on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_image_path, height_field=None, width_field=None, max_length=None)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('carts'), on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=5, decimal_places=2)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name=_('cart_items'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('cart_products'), on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, related_name=_('order_products'), on_delete=models.CASCADE)
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class PaymentDetail(models.Model):
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    provider = models.CharField(max_length=255)
    status = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class OrderDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('order_detail_user'), on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=5, decimal_places=2)
    payment = models.ForeignKey(PaymentDetail, related_name=_('order_detail_payment'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


def review_image_path(instance, filename):
    return '/'.join(['review-images/% Y/% m', str(instance.name), filename])


class ProductReview(models.Model):
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('product_reviews_user'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('product_reviews_product'), on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0)
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True, null=True)
    review_image = models.ImageField(upload_to=review_image_path, height_field=None, width_field=None, max_length=None)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    
    class Meta:
        ordering = ['-created_at']

    def get_absolute_url(self):
        return reverse('store:product-review', args=[self.pk])

    def __str__(self):
        return self.title

    def get_review_body(self):
        return self.body


