import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#f3f3f3",
    },
  },
});

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label} <Link to="/">Home</Link>
      </Typography>
    </Toolbar>
  );
}

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Next Anime Episode <Link to="/">Home</Link>
              <span> | </span>
              {user ? (
                <Link onClick={logoutUser}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
              <span> | </span>
              {user ? <p></p> : <Link to="/register">Register</Link>}
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
};

export default Header;
