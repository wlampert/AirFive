from django.db import models
from users.models import User
from multiselectfield import MultiSelectField
import os
import uuid

class ListingImage(models.Model):
    def file_rename(instance,filename):
        ext = filename.split('.')[-1]
        return os.path.join("/", str(uuid.uuid4())+"."+ext)
    description = models.CharField(max_length=100,default="")
    image  = models.FileField(upload_to=file_rename)


class Listing(models.Model):
    TYPES = (
            (1, 'Social'),
            (2, 'Talk'),
            (3, 'Workshop'),
            (4, 'Others')
    )
    type = MultiSelectField(choices = TYPES,default="")
    images = models.OneToOneField(ListingImage, on_delete=models.CASCADE, default=None)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,default=None)
    price = models.IntegerField(default=0)
    title = models.CharField(max_length=50, default=None)
    # New fields for AirFive
    short_description = models.CharField(max_length=200, default="")
    long_description = models.CharField(max_length=5000, default="")
    duration =  models.IntegerField(default=0)
    group_size =  models.IntegerField(default=0)
    date = models.CharField(max_length=100)

class Recommendation(models.Model):
    item_id = models.IntegerField(default=None)
    recommended_items = models.CharField(max_length=100, blank=True)

class Review(models.Model):
    date = models.DateField(auto_now=True)
    description = models.CharField(max_length=250, default="")
    rating = models.IntegerField(choices=((1,"1"), (2,"2"), (3,"3"), (4,"4"), (5,"5")), default="")
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=None,related_name="associated_user")
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,default=None,related_name="review_author")
