import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import React, {useState} from 'react'
import { useEffect } from 'react';
import getMyEvents from '../helpers/Utils/getMyEvents.js';
import { Button, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import noRepeatEvents from '../helpers/Utils/noRepeatEvents.js';
import { GetByLocTM } from '../helpers/EventsApi/GetByLocTM.jsx';
import takeEventDetails from '../helpers/Utils/takeEventDetails.js';
import Local from '../helpers/Local.js';


//we can use geolocation or user's DB location - see "getEvents" function below

// Currently limiting it to display only 4 events with a "see more" down the bottom,
// but it can display up to 20. See More should eventually lead to the events search page

function EventsCards() {
const [events, setEvents] = useState(); 
const [loading, setLoading] = useState(true);
const [showList, setShowList]= useState(false);
const userInfo = Local.getUser()


useEffect(() => {
 getEvents();
}, [])


    async function getEvents(){  
        console.log("getting events for event cards....")
    let apiData =  await GetByLocTM(userInfo.location);
      console.log("Events near me fetch result :", apiData)
    let newResults=  await apiData.map((result) =>  
                {let eventdetails = takeEventDetails(result, userInfo.location, userInfo.userId);
                return eventdetails});
    console.log("other Results" , newResults)

      await setEvents(newResults);
    console.log("newResults for events near me: ", newResults)  
       
    
      //function checks events against first event for uniqueness
        // the number is how many objects it returns in the array
        // let limitedEvents = await noRepeatEvents(newResults,4);
  
        // await setEvents(limitedEvents); 
        setLoading(false)
        setShowList(true)
    }

  return (
    <div className= "event-cards">
            {loading &&
            <div>
            <h1>Loading......</h1>  
            {/* <CircularProgress /> */}
            </div>
            }




        {showList && 
        <div>
         {
      events.map(r => {
          return <List key={r.id} sx={{ width: '100%', maxWidth: "70vw", bgcolor: 'background.paper'}}>
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
           src={r.image} 
           style={{width:"100px",
           maxHeight:"50px"}}
           />
        </ListItemAvatar>
        <ListItemText
          primary={r.name} 
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {r.date}, {r.time}
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


        {/* Takes user to search events with default current location.
        We can change this for a modal later if preferred */}
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