import hmac
import os

from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.db import models
from django.conf import settings


class Auth(models.Model):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE,related_name="token")
    auth_val = models.CharField(max_length = 1024)
    date = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        self.auth_val = hmac.new(
            key = settings.SECRET_KEY.encode('utf-8'),
            msg = os.urandom(32),
            digestmod = 'sha256',
        ).hexdigest()

        super(Auth,self).save(*args,**kwargs)



class User(models.Model):
    username = models.CharField(max_length=100, default='')
    email = models.CharField(max_length=100, default='', unique=True)
    password = models.CharField(max_length=1024, default="default_password")
    address = models.CharField(max_length=100, default='', blank=True)
    phone_number = models.BigIntegerField(default=0)
    rating = models.SmallIntegerField(default=0)
    name = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=5000, blank=True)
    image_id = models.CharField(max_length=100, blank=True)

    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(User,self).save(*args,**kwargs)

    def login(self,password):
        if check_password(password,self.password):
            auth_token = Auth.objects.create(user=self)
            return auth_token
        raise Exception([password,self.password,check_password(password,self.password)])

    def logout(self,token):
        tokens = Auth.objects.filter(user=self)
        for i in tokens:
            if i.auth_val == token:
                i.delete()
                return

        raise Exception("No auth")
