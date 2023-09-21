from rest_framework.serializers import ModelSerializer
from base.models import Anime
from django.contrib.auth.models import User
from rest_framework import serializers


class AnimeSerializer(ModelSerializer):
    class Meta:
        model = Anime
        fields = "__all__"


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
