from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.core.validators import RegexValidator
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        """
        Creates and save a User with the phone_number and password
        """
        if not username:
            raise ValueError('User name number must be set.')

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)
    
    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("user name"), max_length=50, unique=True)
    phone_regex = RegexValidator(regex=r'^(09|\+639)\d{9}$')
    phone_number = models.CharField(_("phone number"), validators=[phone_regex], max_length=50, unique=True)
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    first_name = models.CharField(_("first name"), max_length=255)
    last_name = models.CharField(_("last name"), max_length=255)
    is_active = models.BooleanField(_("active"), default=True)
    is_staff = models.BooleanField(_("staff"), default=False)
    created_at = models.DateTimeField(_("date joined"), auto_now=False, auto_now_add=True)

    objects = UserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['phone_number', 'email', 'first_name', 'last_name']

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
        send_email(subject, message, from_email, [self.email], **kwargs)


    class Profile(models.Model):
        user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name='%(class)s_profile', verbose_name=_("user profile"), on_delete=models.CASCADE)
        address = models.CharField(_("address"), max_length=255)
        is_seller = models.BooleanField(_("seller"), default=False)

        def __str__(self):
            return str(user)

        def is_user_seller(self):
            return str(is_seller)


    class Review(models.Model):
        sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_review_sender', verbose_name=_("sender"), on_delete=models.CASCADE)
        recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_review_recipient', verbose_name=_("recipient"), on_delete=models.CASCADE)
        rating = models.DecimalField(_("rating"), max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0)
        content = models.TextField(_("content"))
        slug = models.SlugField(_("slug"), max_length=50)
        created_at = models.DateTimeField(_("created at"), auto_now=False, auto_now_add=True)
        last_updated = models.DateTimeField(_("last updated"), auto_now=True, auto_now_add=False)

        def __str__(self):
            return self.content
