# Generated by Django 2.2.4 on 2019-09-16 19:22

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('map_app', '0004_building_an_construire'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='an_expertiza',
            field=models.IntegerField(default=-1),
        ),
    ]
