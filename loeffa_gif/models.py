from django.db import models

# Create your models here.

class Item (models.Model):
    id = models.AutoField(primary_key=True)
    score = models.IntegerField()
    url = models.CharField(max_length=250)