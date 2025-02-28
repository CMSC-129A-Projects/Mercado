from core.utils import unique_slugify
from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator
from django.utils.translation import gettext_lazy as _
from django.db import models

from store.models import Cart


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, phone_number, password, **extra_fields):
        """
        Creates and save a User with the phone number and password
        """

        if not phone_number:
            raise ValueError("Phone number is missing")

        user = self.model(phone_number=phone_number, **extra_fields)
        user.set_password(password)

        user.save(using=self._db)

        # Create a Profile object for the user
        profile = Profile(user=user)
        profile.save()

        # Create a Cart object for the user
        cart = Cart(user=user)
        cart.save()

        # Create a UserAddress object for the user
        address = UserAddress(user=user)
        address.save()

        return user

    def create_user(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(phone_number, password, **extra_fields)
    
    def create_superuser(self, phone_number, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError("User admin status is not set")

        return self._create_user(phone_number, password, **extra_fields)


# Custom User model 
class User(AbstractBaseUser, PermissionsMixin):
    """
    Creates custom User model with phone number as username

    Parameters:
        phone_number (char_field): Phone number of the user (w/ PH code regex)
        first_name (char_field):
        last_name (char_field):
        username (char_field):
        email (char_field):
        is_set (boolean_field): True is user address is set
        is_active (boolean_field): If False, user cannot login
        is_staff (boolean_field):
    """

    phone_number = models.CharField(validators=[RegexValidator(regex=r'^(09|\+639)\d{9}$')], max_length=50, unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    is_set = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    objects = UserManager()
    
    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'username']

    class Meta:
        ordering = ['last_name']

    def get_full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    def get_short_name(self):
        return self.first_name

    def get_user_type(self):
        return self.user_type

    def __str__(self):
        return self.username


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('profile'), on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=25, unique=True)
    image = models.ImageField(upload_to='profile-images/', height_field=None, width_field=None, max_length=None, blank=True, null=True)
    dob = models.DateField(_('date of birth'), auto_now=False, auto_now_add=False, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    bio = models.CharField(max_length=100, blank=True, null=True)

    def save(self, **kwargs):
        unique_slugify(self, self.user.username)
        super(Profile, self).save(**kwargs)

    def __str__(self):
        return str(self.user)


class UserAddress(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('user_address'), on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=100)
    brgy = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    province = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name_plural = _('addresses')

    def __str__(self):
        complete_address = '%s, %s, %s, %s, %s ' % (self.address_line1, self.brgy, self.city, self.province, self.region)
        return complete_address


class UserReview(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user_review_author'), on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, related_name=_('author_profile'), on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=_('user_review_recipient'), on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)], default=0)
    body = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=25, unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['-created_at']

    def save(self, **kwargs):
        unique_slugify(self, self.body)
        super(UserReview, self).save(**kwargs)

    def get_review_body(self):
        return self.body
