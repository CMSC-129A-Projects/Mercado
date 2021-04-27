from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and save a User with the phone_number and password
        """
        if not email:
            raise ValueError("Email is not set.")

        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError("is_superuser is set to False.")

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def get_username(self):
        """
        Returns user email
        """
        return self.email

    def get_full_name(self):
        """
        Returns the formatted full name of the user
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """
        Returns only the first name
        """
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Send an email to the user
        """
        if not self.email:
            raise ValueError('No email')

        send_email(subject, message, from_email, [self.email], **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('profile'), on_delete=models.CASCADE)
    bio = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        order_with_respect_to = 'user'

    def get_absolute_url(self):
        return reverse('accounts:user-profile', kwargs={'slug': self.slug})

    def __str__(self):
        return str(user)


def profile_image_path(instance, filename):
    return '/'.join(['profile-images/% Y/% m', str(instance.name), filename])


class ProfileImage(models.Model):
    profile = models.ForeignKey(Profile, related_name=_('profile'), on_delete=models.CASCADE)
    image = models.ImageField(upload_to=profile_image_path, height_field=None, width_field=None, max_length=None)
    created_at = models.DateTimeField(_('image upload timestamp'), auto_now=False, auto_now_add=True)


class UserAddress(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('user_address'), on_delete=models.CASCADE)
    address_line1 = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255)
    postal_code =  models.CharField(max_length=50)
    country = models.CharField(max_length=50, default='PH')
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        verbose_name_plural = _('addresses')
        order_with_respect_to = 'user'

    def __str__(self):
        complete_address = '%s, %s, %s, %s %s ' % (self.address_line1, self.address_line2, self.city, self.country, self.postal_code)
        return complete_address


class UserPhone(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('user_phone'), on_delete=models.CASCADE)
    phone_regex = RegexValidator(regex=r'^(09|\+639)\d{9}$')
    phone_number = models.CharField(validators=[phone_regex], max_length=50, unique=True)
    is_verified = models.BooleanField(default=False)

    class Meta:
        order_with_respect_to = 'user'

    def __str__(self):
        return self.phone_number


class UserReview(models.Model):
    created_by = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('user_review_creator'), on_delete=models.CASCADE)
    recipient = models.OneToOneField(settings.AUTH_USER_MODEL, related_name=_('review_recipient'), on_delete=models.CASCADE)
    rating = models.DecimalField( max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0)
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['-created_at']

    def get_absolute_url(self):
        return reverse('accounts:user-review', kwargs={'slug': self.slug})

    def __str__(self):
        return self.title

    def get_review_body(self):
        return self.body
