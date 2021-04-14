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
    phone_regex = RegexValidator(regex=r'^(09|\+639)\d{9}$')
    phone_number = models.CharField(_("Phone Number"), validators=[phone_regex], max_length=50, unique=True)
    email = models.EmailField(_("E-mail Address"), max_length=100, blank=True, null=True)
    first_name = models.CharField(_("First Name"), max_length=100)
    last_name = models.CharField(_("Last Name"), max_length=100)
    is_active = models.BooleanField(_("Is Active"), default=True)
    is_staff = models.BooleanField(_("Is Staff"), default=False)
    created_at = models.DateTimeField(_("Timestamp Created"), auto_now=False, auto_now_add=True)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone_number', 'first_name', 'last_name']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.username

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
            raise ValueError("No email.")

        send_email(subject, message, from_email, [self.email], **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='%(class)s_profile', verbose_name=_("User Profile"), on_delete=models.CASCADE)
    profile_img = models.CharField(_("Profile Image"), max_length=255, blank=True)
    bio = models.CharField(_("Bio"), max_length=255, blank=True, null=True)
    address = models.CharField(_("Address"), max_length=255, blank=True, null=True)
    is_seller = models.BooleanField(_("Is Seller"), default=False)

    def __str__(self):
        return str(user)

    def is_user_seller(self):
        return str(is_seller)


class UserReview(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_review_author', verbose_name=_("Author"), on_delete=models.CASCADE)
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_review_recipient', verbose_name=_("Recipient"), on_delete=models.CASCADE)
    rating = models.DecimalField(_("Rating"), max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0)
    content = models.TextField(_("Content"))
    slug = models.SlugField(_("Slug"), max_length=50)
    created_at = models.DateTimeField(_("Timestamp Created"), auto_now=False, auto_now_add=True)
    last_updated = models.DateTimeField(_("Timestamp Updated"), auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.content
