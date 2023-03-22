import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
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
import addEventsToDB from "../helpers/Utils/addEventsToDB";
import LocationDropdown from "./Registration/LocationDropdown";
import takeEventDetails from "../helpers/Utils/takeEventDetails";


function ChooseEvents() {
    const navigate = useNavigate();

      const [location, setLocation] = useState(); 
      const [events, setEvents] = useState(); 
      const [eventsDetails, setEventsDetails] = useState()
      const [showEvents, setShowEvents] = useState(false);
      const [showEdit, setShowEdit]= useState(false);
      const [showTitle, setShowTitle]= useState(true);
      const [chosenEvents, setChosenEvents] = useState([]);
      const [locationInput, setLocationInput]= useState("")
      const userInfo = Local.getUser();
      const [dblocation, setDbLocation] = useState(userInfo.location); 

    //Loads with user's current country in DB when loading    
    useEffect(() => {
    getLocation();
    
    }, []);
    

   //gets user location from local storage and sets it
    async function getLocation(){
       await  getEvents(dblocation)
    };

    //location submits on typing
    const handleChange = event => {
        // setLocation(event.target.value);
        setLocationInput(event.target.value);
      };
    
      //show or don't show abiity to edit
    function handleEditButton(){
        setShowEdit(true);
        setShowTitle(false);
    }  

    async function handleFormLocation(e){
        e.preventDefault();
        // await getEvents(location)
        // console.log("events set as:", events)
        getEvents(locationInput)
        setLocation(locationInput)
        setShowEdit(false);
        setShowTitle(true);
      };
    
     
    async function getEvents(location){
        let results = await GetByLocTM(location);
      //formatting the object to only take what we need
    let newResults= results.map((result) =>{ 
        return {
        "id": result.id, 
        "name": result.name, 
        "image": result.images["0"].url, 
        "date" : result.dates.start.localDate, 
        "time" : result.dates.start.localTime, 
        "venue" : result._embedded.venues["0"].name
      }});
        console.log("new Results" , newResults)
        await setEvents(newResults);
         setShowEvents(true);  
        //  let moreEventData= await results.map(r => takeEventDetails(r, location))
        // setEventsDetails(moreEventData)
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

  
  async function handleSend (){
    // sends user event choice to DB
    let toPost = await chosenEvents.map((c) => ClientAPI.addToUserEvents(userInfo.userId, c))
    // sends detailed events to
    console.log("to post user events", toPost)
    let newEvents= await addEventsToDB(chosenEvents, events); 
    console.log("The detail events resp", newEvents) 
    // navigate("/matched")
  }

  return (
    <div className="choose-events">
      
{ showEdit &&
       <div className="edit-location">
        <form className= "edit-loc-form" onSubmit={e => handleFormLocation(e)}>
        <h2>Events in </h2>
      
        <TextField id="standard-basic" label="city, country" variant="standard" 
              name="location"
              type="text"
              // value={location}
              onChange={e => handleChange(e)}
            />
            
           
            {/* <LocationDropdown
            label="city"
            name="location"
            defaultValue={userInfo.location}
            onChange={e => handleChange(e)}
            /> */}
           
          <button className="edit" type="submit">
            ✓
          </button>
          </form>
      
      </div>
}

    { showTitle &&
      <div className="title"> 
       <h2 onClick={(e)=> handleEditButton()}>Events in {location}</h2>
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
