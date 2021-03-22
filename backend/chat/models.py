from django.db import models

# Create your models here.

class Message (models.Model):
    recipientID = models.DecimalField(decimal_places=0, max_digits=20)
    receiverID = models.DecimalField(decimal_places=0, max_digits=20)
    content = models.TextField()    