import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Local from "../helpers/Local";
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function TopNav(props) {
  const navigate = useNavigate();
  const userInfo = Local.getUser();
  const isLoggedIn = Local.getToken() !== "";

  return (
    <div className="TopNav">
      {isLoggedIn ? (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="logo" component="logo" sx={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  sx={{ color: "white" }}
                  style={{
                    textDecoration: "none",
                    color: "rgba(0, 0, 0, 0.87)",
                  }}
                >
                  EventMate
                </Link>
              </Typography>

              <Link to="/notifications">
                <IconButton aria-label="notifications"
                  sx={{ mx: 2 }}>
                  <NotificationsIcon 
                  fontSize="large"/>
                </IconButton>
              </Link>

              <Avatar
                alt={userInfo.username}
                src={userInfo.avatarURL}
                sx={{ mr: 2 }}
              />
              <div>
                {userInfo.username}

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
              <Typography variant="logo" component="logo" sx={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  sx={{ color: "white" }}
                  style={{
                    textDecoration: "none",
                    color: "rgba(0, 0, 0, 0.87)",
                  }}
                >
                  EventMate
                </Link>
              </Typography>

              <Button
                color="inherit"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </div>
  );
}
