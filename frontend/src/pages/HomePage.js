import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

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
      <p>You are logged to the home page!</p>

      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>{anime.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;