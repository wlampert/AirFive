# Generated by Django 2.2.4 on 2020-05-01 23:26

from django.db import migrations, models
import services.models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_auto_20200430_0125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listingimage',
            name='image',
            field=models.FileField(upload_to=services.models.ListingImage.file_rename),
        ),
    ]