import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const AnimeCard = ({ anime }) => {
  const [nextEpisode, setNextEpisode] = useState("");
  const [timeLeft, setTimeLeft] = useState({});

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
  );
};

export default AnimeCard;
