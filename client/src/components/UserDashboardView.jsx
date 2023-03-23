import React from "react";
import EventsCards from "./EventsCards.jsx";
import Local from "../helpers/ClientAPI";

import EventsNearMe from "./EventsNearMe.jsx";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { CardActionArea } from "@mui/material";
function UserDashboardView() {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  console.warn("User Info", userInfo);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="190"
                image={userInfo.avatarURL}
                alt={userInfo.username}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {userInfo.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userInfo.email} | {userInfo.location}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <div className="user-dashboard">
            <Paper elevation={3} style={{ padding: "20px" }}>
              <h2>My Events</h2>
              <EventsCards />
            </Paper>
            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
              <h2>Events Near Me</h2>
              <EventsNearMe />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default UserDashboardView;
