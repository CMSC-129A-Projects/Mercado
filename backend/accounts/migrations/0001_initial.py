# Generated by Django 3.1.7 on 2021-03-28 19:54

import accounts.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('phone_number', models.CharField(max_length=50, unique=True, validators=[django.core.validators.RegexValidator(regex='^(09|\\+639)\\d{9}$')], verbose_name='Phone Number')),
                ('email', models.EmailField(max_length=255, unique=True, verbose_name='E-mail Address')),
                ('first_name', models.CharField(max_length=255, verbose_name='First Name')),
                ('last_name', models.CharField(max_length=255, verbose_name='Last Name')),
                ('is_active', models.BooleanField(default=True, verbose_name='User Active?')),
                ('is_staff', models.BooleanField(default=False, verbose_name='User a Staff?')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', accounts.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='UserReview',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(decimal_places=1, default=0, max_digits=2, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)], verbose_name='Rating')),
                ('content', models.TextField(verbose_name='Content')),
                ('slug', models.SlugField(verbose_name='Slug')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Date Created')),
                ('last_updated', models.DateTimeField(auto_now=True, verbose_name='Date Last Updated')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userreview_review_author', to=settings.AUTH_USER_MODEL, verbose_name='Author')),
                ('recipient', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userreview_review_recipient', to=settings.AUTH_USER_MODEL, verbose_name='Recipient')),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profile_img', models.CharField(blank=True, max_length=255, verbose_name='Profile Image')),
                ('bio', models.CharField(blank=True, max_length=255, null=True, verbose_name='Bio')),
                ('address', models.CharField(blank=True, max_length=255, null=True, verbose_name='Address')),
                ('is_seller', models.BooleanField(default=False, verbose_name='User a Seller?')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile_profile', to=settings.AUTH_USER_MODEL, verbose_name='User Profile')),
            ],
        ),
    ]