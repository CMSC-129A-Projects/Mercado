from core.utils import unique_slugify
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils.translation import gettext_lazy as _
from django.db import models


class Category(models.Model):
    name = models.CharField(_('category name'), max_length=50, db_index=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name
    

class Product(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('products'), on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name=_('product_category'), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=25, unique=True)
    price = models.FloatField()
    disc_price = models.FloatField(_('discounted price'), blank=True, null=True, default=0)
    stock = models.IntegerField(default=1)
    sold = models.IntegerField(default=0)
    image = models.ImageField(upload_to='product_images/', height_field=None, width_field=None, max_length=None)
    in_stock = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['-created_at']

    def save(self, **kwargs):
        unique_slugify(self, self.name)
        super(Product, self).save(**kwargs)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user_cart'), on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name=_('cart_items'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('products_in_cart'), on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class OrderItem(models.Model):
    item = models.ForeignKey(CartItem, related_name=_('items_in_order'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class PaymentDetail(models.Model):
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    provider = models.CharField(max_length=50)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class OrderDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user_order_details'), on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=5, decimal_places=2)
    payment = models.ForeignKey(PaymentDetail, related_name=_('order_detail_payment_details'), on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class ProductReview(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user_product_reviews'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('product_product_reviews'), on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
    title = models.CharField(max_length=100)
    body = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=25, unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    
    class Meta:
        ordering = ['-created_at']

    def save(self, **kwargs):
        unique_slugify(self, self.title)
        super(ProductReview, self).save(**kwargs)

    def __str__(self):
        return self.title

    def get_review_body(self):
        return self.body


def product_review_image_path(instance, filename):
    return '/'.join(['product-review-images/% Y/% m', str(instance.name), filename])


class ProductReviewImage(models.Model):
    product_review = models.ForeignKey(ProductReview, related_name=_('product_review_images'), on_delete=models.CASCADE)
    image = models.ImageField(upload_to=product_review_image_path, height_field=None, 
        width_field=None, max_length=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


