# Generated by Django 2.2.4 on 2020-05-08 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20200508_0126'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image_id',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
