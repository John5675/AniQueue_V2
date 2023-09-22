import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ anime, onRemove }) => {
  let { authTokens } = useContext(AuthContext);
  const [nextEpisode, setNextEpisode] = useState("");
  const [timeLeft, setTimeLeft] = useState({});
  const navigate = useNavigate();

  const addAnimeToUserList = async () => {
    if (!authTokens) {
      alert("Please log in to add to your list.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/add_anime_to_user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access), // Use the token from your context
          },
          body: JSON.stringify({
            json_data: anime,
          }),
        }
      );

      if (response.status === 200) {
        navigate("/");
      } else {
        console.error(
          "Status:",
          response.status,
          "Status text:",
          response.statusText
        ); // For debugging
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Failed to add anime:", error);
    }
  };

  useEffect(() => {
    const calculateNextEpisode = () => {
      const currentDateTime = new Date();
      const firstEpisodeDate = new Date(anime.aired.from);
      const episodeDurationInMilliseconds = 7 * 24 * 60 * 60 * 1000;

      const timeSinceFirstEpisode = currentDateTime - firstEpisodeDate;
      const episodesPassed = Math.floor(
        timeSinceFirstEpisode / episodeDurationInMilliseconds
      );
      const currentEpisodeNumber = episodesPassed + 1;

      const nextEpisodeDate = new Date(
        firstEpisodeDate.getTime() +
          (episodesPassed + 1) * episodeDurationInMilliseconds
      );

      // For nextEpisode
      let message = `Episode ${currentEpisodeNumber} will air on ${nextEpisodeDate.toDateString()} at ${nextEpisodeDate.toLocaleTimeString()}.`;
      setNextEpisode(message);

      // For timeLeft
      const difference = nextEpisodeDate - currentDateTime;
      if (difference > 0) {
        let timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        setTimeLeft(timeLeft);
      } else {
        setTimeLeft(null);
      }
    };

    calculateNextEpisode(); // Initial call

    const timerForEpisode = setInterval(calculateNextEpisode, 60000); // Update next episode every minute
    const timerForTimeLeft = setInterval(calculateNextEpisode, 1000); // Update time left every second

    return () => {
      clearInterval(timerForEpisode);
      clearInterval(timerForTimeLeft);
    };
  }, [anime]);

  return (
    <div>
      <a
        href={anime.url}
        target="_blank"
        rel="noreferrer"
        style={{ textDecoration: "none" }}
      >
        <Card style={{ cursor: "pointer" }}>
          <CardMedia
            component="img"
            alt={anime.title}
            style={{ height: "auto", maxHeight: "200px", objectFit: "contain" }}
            image={anime.images.jpg.image_url}
          />
          <CardContent>
            <Typography variant="h6" component="h2">
              {anime.title}
            </Typography>

            {/* If anime is not airing, show 'Finished Airing' */}
            {!anime.airing && (
              <Typography variant="body2" component="p">
                Finished Airing
              </Typography>
            )}

            {/* If anime is airing, show the countdown */}
            {anime.airing && nextEpisode && (
              <Typography variant="body2" component="p">
                {nextEpisode}
              </Typography>
            )}

            {anime.airing && timeLeft && (
              <Typography variant="body2" component="p">
                Time left until airing: {timeLeft.days} days {timeLeft.hours}{" "}
                hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds{" "}
              </Typography>
            )}
          </CardContent>
        </Card>
      </a>
      <button onClick={addAnimeToUserList}>Add to My List</button>
      <button onClick={() => onRemove(anime.mal_id)}>Remove</button>
    </div>
  );
};

export default AnimeCard;
