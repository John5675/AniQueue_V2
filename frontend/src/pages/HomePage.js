import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import AnimePage from "./AnimePage";
import AnimeCard from "../components/AnimeCard";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const HomePage = () => {
  let [animes, setAnimes] = useState([]);
  let { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getAnimes();
  }, []);

  let getAnimes = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/animes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();

    if (response.status === 200) {
      setAnimes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <AnimePage />
      <p>Your List</p>
      <Grid container spacing={2} style={{ margin: "0 20%", maxWidth: "60%" }}>
        {animes.map((anime) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AnimeCard
              key={anime.id}
              anime={anime.json_data} // This assumes that AnimeCard expects a prop named 'anime'
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
