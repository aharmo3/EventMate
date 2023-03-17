import { Box, Button, Modal } from '@mui/material'
import React, {useState} from 'react'

function EventsDisplayModal({isOpen, handleOpen, eventData}) {

    

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
    <img
     style={{maxHeight:"200px", maxWidth: "200px"}}
     src= {eventData.image} 
     alt= {`event ${eventData.name}`} 
     />   

    <h2>{eventData.name}</h2>

    <h3>Description:</h3>
    { eventData.eventType === "Music" &&
    <p>{eventData.genre}-{eventData.subgenre} music event, live at {eventData.venue}</p>
    }
    <p>{eventData.eventType} Event, {eventData.genre}, {eventData.subgenre}</p>
    <Button href={eventData.purchaseLink}  target="_blank" >Purchase Tickets Online</Button>
    <Button>add to my events</Button>
    </Box>
       

      </Modal>
  )
}

export default EventsDisplayModal
