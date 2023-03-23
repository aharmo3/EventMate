import React, { useState, useEffect } from "react";
import Local from "../helpers/Local";
import ClientAPI from "../helpers/ClientAPI";
import UserDialogView from "./UserDialogView";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chat from "./Chat";

export default function NotificationView() {
  const [showChat, setShowChat] = useState(false);

  const userId = Local.getUserId();

  // For Dialog
  const [open, setOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);

  let [connections, setConnections] = useState([]);
  // You've done the inviting
  const [myInvites, setMyInvites] = useState([]);

  // They've done the inviting
  const [invited, setInvited] = useState([]);

  // Confirmed
  const [confirmed, setConfirmed] = useState([]);

  // Rejected
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    getConnections(Local.getUserId());
  }, connections);

  // Update
  function handleUpdate(accepted, invite) {
    ClientAPI.updateInvite(invite.connectId, invite.inviterId, accepted);
    getConnections(userId);
  }

  // Gets the connections for the notification view
  async function getConnections(userId) {
    console.log("--------------------------");
    let uresponse = await ClientAPI.getConnections(userId);

    if (uresponse.ok) {
      const mInv = uresponse.data.filter((row) => {
        return row.inviterId === userId && row.accepted === null;
      });

      const tInv = uresponse.data.filter((row) => {
        return row.inviterId !== userId && row.accepted === null;
      });

      const conf = uresponse.data.filter((row) => {
        return row.accepted === 1;
      });

      const rej = uresponse.data.filter((row) => {
        return row.accepted === 0;
      });

      console.log("their Invites: ", tInv);

      setInvited(tInv);
      setMyInvites(mInv);
      setConfirmed(conf);
      setRejected(rej);
      setConnections(false);
      setConnections(uresponse.data);
    } else {
      console.log("Error!", uresponse.error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (userId) => {
    console.log("----", userId);
    setProfileClicked(userId);
    setOpen(true);
  };

  const handleChat = (invite) => {
    setShowChat(invite);
  };

  function inviteList(iList, type) {
    return (
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <Divider component="li" />

        {iList &&
          iList.map((invite) => (
            <div>
              <ListItem key={invite.connectId}>
                <ListItemText
                  primary={
                    <div>
                      {invite.inviterUsername === Local.getUserName()
                        ? "You"
                        : invite.inviterUsername}{" "}
                      invited{" "}
                      {invite.inviteeUsername === Local.getUserName()
                        ? "You"
                        : invite.inviteeUsername}
                    </div>
                  }
                  secondary={
                    <div>
                      <div>
                        {invite.eventname} :: {invite.eventdate} ::{" "}
                        {invite.eventlocation}
                      </div>
                    </div>
                  }
                />

                {type === 2 && (
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleUpdate(1, invite);
                      }}
                    >
                      Accept
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => {
                        handleUpdate(0, invite);
                      }}
                    >
                      Reject
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={(e) => handleClickOpen(invite.inviterId)}
                    >
                      View Profile
                    </Button>
                  </div>
                )}

                {type === 3 && (
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleChat(invite)}
                    >
                      Chat
                    </Button>
                    {showChat && <Chat showChat={showChat} />}
                    {/* onClick calls an outside method within notification view... it compares the local id with the inviter id and the invitee id
                     then if statment to compare which one you are ...
                     then it will navigate to chat component and pass in my local id and the other person's id */}
                    {/* then find a way to pass those ids into chat and use them as variables in the rest of my code */}
                    {/* opens the chat component */}
                    {/* who is inviter and who is invitee when clicking on the chat button */}
                  </div>
                )}
              </ListItem>
              <Divider component="li" />

              {profileClicked && (
                <UserDialogView
                  open={open}
                  onClose={handleClose}
                  userId={profileClicked}
                />
              )}
            </div>
          ))}
      </List>
    );
  }

  return (
    <div>
      <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
        Awaiting Their Reply
      </Typography>
      {inviteList(myInvites, 1)}

      <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
        Awaiting Your Reply
      </Typography>
      {inviteList(invited, 2)}

      <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
        Confirmed
      </Typography>
      {inviteList(confirmed, 3)}

      <Typography sx={{ mt: 4, mb: 0 }} variant="h6" component="div">
        Rejected
      </Typography>
      {inviteList(rejected, 4)}
    </div>
  );
}
