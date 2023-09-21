import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <Link to="/">Home</Link>
      <span> | </span>
      {user ? (
        <Link onClick={logoutUser}>Logout</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <span> | </span>
      {user ? <p></p> : <Link to="/register">Register</Link>}
    </div>
  );
};

export default Header;
