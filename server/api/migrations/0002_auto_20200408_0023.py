# Generated by Django 3.0.5 on 2020-04-08 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='victim',
            name='phone_number',
        ),
        migrations.AddField(
            model_name='provider',
            name='phonenumber',
            field=models.CharField(max_length=30, null=True),
        ),
        migrations.AddField(
            model_name='victim',
            name='email',
            field=models.EmailField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='victim',
            name='phonenumber',
            field=models.CharField(max_length=30, null=True),
        ),
    ]
