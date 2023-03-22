import React, { useState, useEffect } from "react";
import ClientAPI from "../helpers/ClientAPI";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

// Numerical typing for buttons
// type = 1: viewing from notifications awaiting your reply - accept or reject
// type = 2: viewing from notifications awaiting their reply - no buttons (could have a cancel invite in the future)
// type = 3: viewing from matched - invite button

export default function UserDialogView({open, onClose, userId}) {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    console.log("user id", userId);
    getProfile(userId);
  }, []);

   // Gets the connections for the notification view
   async function getProfile(user) {
    console.log("user iddddd", user);
    let uresponse = await ClientAPI.getUser(user);

    if (uresponse.ok) {
      setProfile(uresponse.data);
    } else {
      console.log('Error!', uresponse.error);
    }
  }



  return (
    <Dialog 
      onClose={onClose} 
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <DialogContent>

      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>


      { 
        profile &&
        <Box    
          sx={{ 
            width: '70%',
            mx: 'auto',
            display: "grid",
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)'
          }}
        >

          <Box
          sx={{ 
            gridColumn: '1',
            gridRow: '1',
          }}
          >
            <Avatar
            variant="rounded"
            alt={profile.username}
            src={profile.avatarURL}
            sx={{ width: 150, height: 150 }}
            />

            <h2>{profile.username}</h2>
            <p>{profile.location}</p>
          </Box>

          <Box
          sx={{ 
            gridColumn: '2',
            gridRow: '1'
          }}
          >
            <h5>Languages Spoken</h5>
            <p>{profile.languages}</p>

            <h5>Age</h5>
            <p>{profile.age}</p>

            <h5>Gender</h5>
            <p>{profile.gender}</p>
          </Box>

          <Box
          sx={{ 
            gridColumn: '3',
            gridRow: '1'
          }}
          >
            <h5>Occupation</h5>
            <p>{profile.occupation}</p>

            <h5>Interests</h5>
            <p>{profile.interests}</p>

            
          </Box>

          <Box
          sx={{ 
            gridColumn: '2 / 4',
            gridRow: '2',

          }}
          >
            <h3>About</h3>
            <p>{profile.about}</p>

            
          </Box>

          <Box
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gridColumn: '4',
            gridRow: '1',
            alignItems: 'flex-end'
          }}
          >
          <Button variant="outlined">Invite</Button>

            
          </Box>
        </Box>
      }


      </DialogContent>
    </Dialog>
  );
}

