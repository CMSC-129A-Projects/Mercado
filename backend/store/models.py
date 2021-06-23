from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings
from core.utils import unique_slugify


class Category(models.Model):
    name = models.CharField(max_length=50, db_index=True)
    slug = models.SlugField(unique=True, max_length=50)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def save(self, *args, **kwargs):
        unique_slugify(self, self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    

class Product(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user'), on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name=_('product_category'), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=25, unique=True)
    price = models.FloatField()
    disc_price = models.FloatField(_('discounted price'), default=0)
    available_count = models.IntegerField(default=1)
    sold_count = models.IntegerField(default=0)
    image = models.ImageField(upload_to='product_images/', height_field=None, width_field=None, max_length=None)
    is_available = models.BooleanField(default=True)
    location = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        unique_slugify(self, self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('user_cart'), on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    slug = models.SlugField(max_length=25, unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    def save(self, **kwargs):
        unique_slugify(self, self.user.username)
        super(Cart, self).save(**kwargs)

    def __str__(self):
        return self.slug
        

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name=_('cart_items'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('product'), on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('orders'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('order_product'), on_delete=models.CASCADE)
    quantity = models.IntegerField(validators=[MinValueValidator(1)])
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)


def product_review_image_path(instance, filename):
    return '/'.join(['product-review-images/% Y/% m', str(instance.name), filename])


class ProductReview(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('product_review_author'), on_delete=models.CASCADE)
    profile = models.ForeignKey('accounts.Profile', related_name=_('user_profile'), on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name=_('product_review_product'), on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
    body = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=25, unique=True)
    image = models.ImageField(upload_to=product_review_image_path, height_field=None, width_field=None, max_length=None)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    
    class Meta:
        ordering = ['-created_at']

    def save(self, **kwargs):
        unique_slugify(self, self.body)
        super(ProductReview, self).save(**kwargs)

    def __str__(self):
        return (str(self.product.name) + 'review')

    def get_review_body(self):
        return self.body