# Generated by Django 3.0.5 on 2020-04-08 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='phonenumber',
            field=models.CharField(blank=True, max_length=30, null=True),
        ),
    ]