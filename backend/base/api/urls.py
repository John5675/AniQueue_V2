from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path("", views.getRoutes),
    path("add_anime_to_user/", views.addAnimeToUser, name="add-anime-to-user"),
    path("register/", views.register_user, name="register_user"),
    path("upcoming_anime/", views.UpcomingAnime),
    path("searched_anime/", views.SearchedAnime),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("animes/", views.getAnime),
    path("animes/<int:anime_id>/", views.removeAnimeFromUser, name="remove-anime"),
]
