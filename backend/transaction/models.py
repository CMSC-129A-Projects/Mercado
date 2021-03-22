from django.db import models
import json

# Product and reviews
class Product(models.Model):
    Name = models.CharField(max_length=100)
    picture = models.CharField(max_length=20)
    price = models.DecimalField(decimal_places=2, max_digits=100000)
    details = models.TextField()
    review = models.TextField()

class Review(models.Model):
    review = models.TextField()
    picture = models.CharField(max_length=100, null=True)
    rating = models.DecimalField(decimal_places=1, max_digits=2)

class ListingReview(models.Model):
    status = models.CharField(max_length=20, default='in stock')


#transaction and delivery
class Cart(models.Model):
    total_amount = models.DecimalField(decimal_places=2, max_digits=1000)
    total_Items = models.CharField(max_length=1000)

    #functions to create lists for parameters.
    #https://stackoverflow.com/questions/22340258/django-list-field-in-model
    def set_itemList(self, x):
        self.total_Items = json.dumps(x)

    def get_itemList(self):
        return json.loads(self.total_Items)

class Order(models.Model):
    date_Created = models.DateField()
    buyer_Name = models.CharField(max_length=100)
    delivery_Address = models.CharField(max_length=250)
    date_Delivered = models.DateField()
    delivery_Status = models.BooleanField()

class OrderDetails(models.Model):
    product_Name = models.CharField(max_length=100)
    quantity = models.DecimalField(decimal_places=0, max_digits=2)
    weight = models.DecimalField(decimal_places=2, max_digits=10)
    amount = models.DecimalField(decimal_places=0, max_digits=10000)

class Payment(models.Model):
    mode = models.CharField(max_length=100)
    amount = models.DecimalField(decimal_places=2, max_digits=1000)

class Delivery(models.Model):
    orderList = models.CharField(max_length=1000)
    address = models.CharField(max_length=250)
    phone_Number = models.DecimalField(decimal_places=0, max_digits=11)
    delivery_status = models.BooleanField()

    def set_orderList(self,x):
        self.orderList = json.dumps(x)
    def get_orderList(self):
        return json.loads(self.orderList)


