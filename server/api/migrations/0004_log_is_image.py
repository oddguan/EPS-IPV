# Generated by Django 3.0.5 on 2020-04-25 20:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200425_0648'),
    ]

    operations = [
        migrations.AddField(
            model_name='log',
            name='is_image',
            field=models.BooleanField(default=False),
        ),
    ]