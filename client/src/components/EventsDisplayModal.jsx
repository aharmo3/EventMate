import { Box, Modal } from '@mui/material'
import React from 'react'

function EventsDisplayModal({isOpen, handleOpen, eventID}) {




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };



  return (
    
      <Modal
        open={isOpen}
        onClose={e => handleOpen(!isOpen) }
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
    <Box sx={style}>
   
    {eventID}</Box>


      </Modal>
  )
}

export default EventsDisplayModal
