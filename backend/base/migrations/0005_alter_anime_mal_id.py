# Generated by Django 4.2.4 on 2023-09-21 05:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_anime_mal_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='mal_id',
            field=models.IntegerField(default=0),
        ),
    ]