import React, { Component } from "react";
import { render } from "react-dom";
import AnimeCard from "../components/AnimeCard";
import { Container, Grid, Typography, TextField, Box } from "@mui/material";
import { styled } from "@mui/system";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animeData: [],
      filteredData: [],
      search: "",
      title: "Upcoming Anime",
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/upcoming_anime/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          animeData: data.data.data,
          filteredData: data.data.data,
        });
      });
  }

  // Update state as the user types
  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  // Handle Enter key press
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.performSearch();
    }
  };

  // API call to perform search
  performSearch = () => {
    const { search } = this.state;
    console.log("Search query from textfield:", search); // Debug line
    this.setState({ search });

    if (search) {
      // Fetch new data based on the search query
      fetch(`http://127.0.0.1:8000/api/searched_anime/?query=${search}`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ animeData: data.data.data, title: "Searched Anime" });
        });
    } else {
      // If the search query is empty, fetch the upcoming anime list again
      fetch("http://127.0.0.1:8000/api/upcoming_anime/")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ animeData: data.data.data, title: "Upcoming Anime" });
        });
    }
  };

  render() {
    const { animeData, title } = this.state; // Update this line from 'filteredData' to 'animeData'

    return (
      <div>
        <main>
          <Typography variant="h4" style={{ margin: "20px 0" }} align="center">
            {title}
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            onChange={this.handleChange} // Update this line to use 'handleChange'
            onKeyDown={this.handleKeyDown} // Add this line to capture the 'Enter' key press
          />

          <Grid
            container
            spacing={2}
            style={{ margin: "0 20%", maxWidth: "60%" }}
          >
            {animeData.map(
              (
                anime // Update this line from 'filteredData' to 'animeData'
              ) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={anime.mal_id}>
                  <AnimeCard anime={anime} />
                </Grid>
              )
            )}
          </Grid>
        </main>
      </div>
    );
  }
}
