# Generated by Django 2.2.4 on 2019-09-16 19:10

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ('map_app', '0002_auto_20190727_1402'),
    ]

    operations = [
        migrations.RenameField(
            model_name='building',
            old_name='nr_Sector',
            new_name='nr_sector',
        ),
    ]
