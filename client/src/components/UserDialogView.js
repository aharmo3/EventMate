import React, { useState, useEffect } from "react";

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function UserListView({open, onClose, match}) {


  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{match.username}</DialogTitle>
    </Dialog>
  );
}

