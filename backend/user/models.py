from django.db import models

# Create your models here.

class User(models.Model):
    Phone_Number = models.DecimalField(decimal_places = 0, max_digits=11)
    Email_Address = models.CharField(max_length=100)
    Password = models.CharField(max_length=100)
    Username = models.CharField(max_length=100)
    address = models.CharField(max_length=250)

class Buyer(models.Model):
    Name = models.CharField(max_length=100)

class Seller(models.Model):
    Name = models.CharField(max_length=100)

class Review(models.Model):
    review = models.TextField()
    picture = models.CharField(max_length=100)
    rating = models.DecimalField(decimal_places=1, max_digits=2)