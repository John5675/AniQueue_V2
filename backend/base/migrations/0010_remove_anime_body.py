# Generated by Django 4.2.4 on 2023-09-21 06:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0009_alter_anime_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='anime',
            name='body',
        ),
    ]
