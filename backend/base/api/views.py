from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
import requests
from datetime import datetime, timedelta
from .serializers import *
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import AnimeSerializer
from base.models import Anime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET"])
def getRoutes(request):
    routes = ["/api/token", "/api/token/refresh"]
    return Response(routes)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAnime(request):
    user = request.user
    animes = user.animes.all()
    serializer = AnimeSerializer(animes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def UpcomingAnime(request):
    current_time = datetime.now()
    next_day = current_time + timedelta(days=1)
    next_day_str = next_day.strftime("%A").lower()
    try:
        response = requests.get(
            f"https://api.jikan.moe/v4/schedules?filter={next_day_str}"
        )

        if response.status_code == 200:
            anime_data = response.json()
            return Response({"data": anime_data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to fetch data from Jikan API"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def SearchedAnime(request):
    try:
        query = request.GET.get("query", "")
        print(query)
        url = f"https://api.jikan.moe/v4/anime?q={query}&order_by=popularity&limit=20"

        # Fetch data from Jikan API
        response = requests.get(url)
        anime_data = response.json()
        print(anime_data)

        # Filter only the needed data or you can send all data to frontend
        searched_anime = anime_data  # Or your own filtered list

        return Response({"data": anime_data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == "POST":
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addAnimeToUser(request):
    user = request.user
    json_data = request.data.get("json_data")

    # Check if the Anime with the given mal_id exists
    anime, created = Anime.objects.get_or_create(
        json_data=json_data,
    )

    # Add this anime to the user's list of animes
    user.animes.add(anime)

    return Response({"message": "Anime added successfully!"}, status=200)
