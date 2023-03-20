import React, { useState, useEffect } from "react";
import { GetByLocTM } from "../helpers/EventsApi/GetByLocTM";
import Checkbox from '@mui/material/Checkbox';
import Grid from "@mui/material/Grid";
import "./chooseEvents.css"
import { Button, TextField } from "@mui/material";
import LinearStepper from "./LinearStepper";
import { useParams, useNavigate } from "react-router-dom";
import NextBar from "./NextBar";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";


function ChooseEvents() {
    const navigate = useNavigate();

      const [location, setLocation] = useState(); // save location
      const [events, setEvents] = useState(); 
      const [showEvents, setShowEvents] = useState(false);
      const [showEdit, setShowEdit]= useState(false);
      const [showTitle, setShowTitle]= useState(true);
      const [chosenEvents, setChosenEvents] = useState([]);
      // const [isChecked, setIsChecked]= useState([]); 

    //Loads with user's current country in DB     
    useEffect(() => {
    getLocation();
    getEvents(location)
    }, []);
    
    //Loads events when location changes   
    useEffect(() => {
    getEvents(location)
    }, [location]);

    //gets user location from local storage and sets it
    async function getLocation(){
        //get id to fetch user data
        let userInfo= await Local.getUser();
        console.log("user info: ", userInfo)
        let userId = userInfo.userId;
        if (userInfo.location){
          setLocation(userInfo.location)
        }else{
        //placeholder below   
        setLocation("Barcelona, Spain");
        }
    };

    //location submits on typing
    const handleChange = event => {
        setLocation(event.target.value);
      };
    
      //show or don't show abiity to edit
    function handleEditButton(){
        setShowEdit(true);
        setShowTitle(false);
    }  

    async function handleFormLocation(e){
        e.preventDefault();
        await getEvents(location)
        console.log("events set as:", events)
        setShowEdit(false);
        setShowTitle(true);
      };
    
     
    async function getEvents(place){
        let results = await GetByLocTM(location);
      //formatting the object to only take what we need
    let newResults= results.map((result) =>{ 
        return {"id": result.id, 
        "name":result.name, 
        "image": result.images["0"].url, 
        "date" : result.dates.start.localDate, 
        "time" : result.dates.start.localTime, 
        "venue" : result._embedded.venues["0"].name,
        "currency": result.priceRanges["0"].currency,
        "startingPrice":  result.priceRanges["0"].min,
        "purchaseLink":  result.url,
        "genreId":  result.classifications["0"].genre.id,
        "genre": result.classifications["0"].genre.name,
        "subgenre": result.classifications["0"].subGenre.name,
        "eventType": result.classifications["0"].segment.name,
        "eventHost": result._embedded.attractions.name}});
        console.log("new Results" , newResults)
        await setEvents(newResults);
        setShowEvents(true);    
    }

  

   function handleCheckBoxChange(event){
      let eventId= event.target.value;
      let checkedEvents= [...chosenEvents]
      if (checkedEvents.includes(eventId)){
        let idIndex= checkedEvents.indexOf(eventId);
        checkedEvents.splice(idIndex,1);
        setChosenEvents(checkedEvents);
      }else {
        checkedEvents.push(eventId)
        setChosenEvents(checkedEvents);
      }
      console.log(chosenEvents);
   }

   //sends selected events to database
   function handleSend (){
    //here goes put request put(chosenEvents)
    // loading
    //if return is successful - success message
    // route to next page 
    
    navigate("/matched")
    console.log("submitted events:", chosenEvents)
  }

  return (
    <div className="choose-events">
      
{ showEdit &&
       <div className="edit-location">
        <form className= "edit-loc-form" onSubmit={e => handleFormLocation(e)}>
        <h2>Events in </h2>
        <TextField id="standard-basic" label="city" variant="standard" 
              placeholder="enter your location"
              name="location"
              type="text"
              value={location}
              onChange={e => handleChange(e)}
            />
            {/* add a country dropdown selector  */}
          {/* <button className="edit" type="submit">
            ✓
          </button> */}
         
        </form>
      </div>
}

    { showTitle &&
      <div className="title"> 
       <h2>Events in {location}</h2>
       <button className="edit" onClick={(e)=> handleEditButton()}>✎</button>
       </div> 
    }

     { showEvents &&
      <div className="show-choose-events">
       <div className="results-choose-events">
      {
      events.map(r => {
          return <div key={r.id} className="event-items">
              <Checkbox
                className="event-checkbox"
                value={r.id}
                // checked={checked}
                onChange={handleCheckBoxChange}
                inputProps={{
                    'aria-label': 'Checkbox A',
                }}
            />
            <img src= {r.image} alt="" className="event-img"/>
            <p className="event-title">{r.name}</p>
            <p className="event-date-time">{r.date} | {r.time}</p>
            <p className="event-venue">{r.venue}</p>
          </div>
      }
           )}
         </div>
         </div>
         }
   
        <NextBar 
          activeStep={1}
          nextCb={(e) => {
            handleSend()
          }}
          prevCb={
            () => {
              navigate("/register-two")
            }
          }
        />
    </div>
  )
}

export default ChooseEvents
