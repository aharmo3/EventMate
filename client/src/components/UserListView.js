import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Local from "../helpers/Local";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ClientAPI from "../helpers/ClientAPI";
import UserDialogView from "./UserDialogView";
import NextBar from "./NextBar";

export default function UserListView() {
  const navigate = useNavigate();

  const [matched, setMatched] = useState([]);
  const [open, setOpen] = useState(false);
  const [matchClicked, setMatchClicked] = useState([]);

  useEffect(() => {
    getMatched();
    console.log(matched);
  }, []);

  async function getMatched() {
    //Get all events in the events list that I'm going to
    //Get all users going to those events - excluding me

    let matchesToAdd = [];

    let eResponse = await ClientAPI.getUserEvents(Local.getUserId());
    if (eResponse.ok) {
      if (eResponse.data.length > 0) {
        for (let row of eResponse.data) {
          let usersResponse = await ClientAPI.getEventUsers(row.ticketmasterid);
          let users = usersResponse.data;
          let otherUsers = users.filter((user) => {
            return user.userId !== Local.getUserId();
          });

          if (otherUsers.length > 0) {
            matchesToAdd.push(...otherUsers);
          }
        }
      }
    } else {
      console.log("Error!", eResponse.error);
    }

    console.log("To Add: ", matchesToAdd);
    setMatched(matchesToAdd);
    //console.log("Matched: ", matched);
  }

  const handleClickOpen = (matchPass) => {
    //console.log("t----", matchPass);
    setMatchClicked(matchPass);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMatchClicked(false);
  };

  return (
    <Box
      display="flex"
      minHeight="100vh"
      sx={{
        width: "80%",
        maxWidth: 800,
        mx: "auto",
        flexDirection: "column",
      }}
    >
      <h2>Your event matches...</h2>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {matched.length > 0 &&
          matched.map((match) => (
            <div>
              <ListItem key={match.userId}>
                <ListItemAvatar
                  sx={{
                    mr: "15px",
                  }}
                >
                  <Avatar
                    alt={match.username}
                    src={match.avatarURL}
                    sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<div>{match.username}</div>}
                  secondary={
                    <div>
                      <div>Age: {match.age}</div>
                      <div>Gender: {match.gender}</div>
                      <div>Location: {match.location}</div>
                      <div>Event:</div>
                    </div>
                  }
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleClickOpen(match.userId);
                  }}
                >
                  View Profile
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  onClick={() => {
                    ClientAPI.invite(
                      Local.getUserId(),
                      match.userId,
                      match.eventid
                    );
                    let mCopy = [...matched];
                    let pos = matched.indexOf(match);
                    console.log("pos: ", pos);
                    mCopy.splice(pos, 1);
                    setMatched(mCopy);
                    //message to say you have invited so and so
                  }}
                >
                  Invite
                </Button>
              </ListItem>
              <Divider component="li" />

              {matchClicked && (
                <UserDialogView
                  open={open}
                  onClose={handleClose}
                  userId={matchClicked}
                />
              )}
            </div>
          ))}

        {matched.length <= 0 && <div>No Matches Found</div>}
      </List>

      <NextBar
        activeStep={3}
        prevCb={() => {
          navigate(`/events`);
        }}
      />
    </Box>
  );
}
