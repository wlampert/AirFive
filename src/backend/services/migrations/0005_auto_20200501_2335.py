# Generated by Django 2.2.4 on 2020-05-01 23:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0004_auto_20200501_2332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='created_by',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='users.User'),
        ),
    ]