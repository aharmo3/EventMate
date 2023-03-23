import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import {Button, Link, CircularProgress} from '@mui/material';
import React, {useState, useEffect} from 'react'
import getMyEvents from '../helpers/Utils/getMyEvents.js';
import EventsDisplayModal from './EventsDisplayModal.jsx';
import Local from '../helpers/Local.js';




//pass the data into the component as a prop
// you'll need a useEffect on the page it's nested in 

function EventsCards() {
const [events, setEvents] = useState(); 
const [loading, setLoading] = useState(true);
const [showList, setShowList]= useState(false);
const [isOpen, setIsOpen]= useState(false);
const [modalData, setModalData]= useState({});
const userInfo = Local.getUser();

useEffect(() => {
 getEvents();
}, [])

function handleOpenModal(res){
 
  setModalData(res);
  setIsOpen(true)
}



    async function getEvents(){  
        console.log("getting events for event cards....")
    let apiData =  await getMyEvents(userInfo.userId, 6);
 
      console.log("new results mapped", apiData)
        await setEvents(apiData); 
        setLoading(false)
        setShowList(true)
    }

  return (
    <div className= "event-cards">
            {loading &&
            <div>
            <CircularProgress />
            {/* <h1>Loading......</h1>   */}
            </div>
            }




        {showList && 
        <div>
         {
      events.map(r => {
          return <List key={r.eventid} sx={{ width: '100%', maxWidth: "70vw", bgcolor: 'background.paper'}}>
      <ListItem 
     dense={true}
      alignitems="flex-start"
      style={{maxHeight:"60px"}}
      >
        <ListItemAvatar
          sx={{ paddingRight: '10px'}}
          alignitems="center" 
          >
          <img alt="event"
           src={r.imageurl} 
           style={{width:"100px",
           maxHeight:"50px"}}
           />
        </ListItemAvatar>
        <ListItemText
          primary={r.eventname} 
          // onClick={(e) => handleOpenModal(r)} 
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {r.eventdate}, {r.starttime}
              </Typography>
               { `  ${r.venue}` }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
     
    </List>

        })} {/*close map fn */}
       </div> 
   }
{/* 
   <EventsDisplayModal
   isOpen={isOpen}
   handleOpen={setIsOpen}
   eventData={modalData}
   /> */}
   <Link to="/searchevents"
        style={{textDecoration: "none"}}
        >
        <Button 
        variant="text"
        >See More...</Button>
        </Link>
   </div>
  )
}

export default EventsCards
