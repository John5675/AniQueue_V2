# Generated by Django 4.2.4 on 2023-09-21 05:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0008_anime_mal_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='animes', to=settings.AUTH_USER_MODEL),
        ),
    ]