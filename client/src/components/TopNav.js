import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";

export default function TopNav(props) {
  const navigate = useNavigate();
  return (
    <div className="TopNav">
      {props.user ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/" sx={{ color: "white" }}>
                  EventMate
                </Link>
              </Typography>
              <Avatar
                alt={props.user.username}
                src={props.user.avatarURL}
                sx={{ mr: 2 }}
              />
              <div>
                {props.user.username}

                <Button
                  size="small"
                  variant="text"
                  sx={{ p: 0, color: "inherit" }}
                  onClick={() => {
                    navigate("/register-two");
                  }}
                >
                  &nbsp;(Edit Profile)
                </Button>

                <br />
                <Button
                  sx={{ p: 0, color: "inherit" }}
                  onClick={props.logOutCb}
                >
                  Logout
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                EventMate
              </Typography>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}
