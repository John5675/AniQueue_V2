import React, { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";

const AnimeList = () => {
  const [animeData, setAnimeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("Upcoming Anime");

  useEffect(() => {
    if (searchTerm) {
      setTitle("Searched Anime");
      setFilteredData(
        animeData.filter((anime) =>
          anime.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setTitle("Upcoming Anime");
      setFilteredData(animeData);
    }
  }, [searchTerm, animeData]);

  return (
    <div>
      <h1>{title}</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {filteredData.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
