import React, { useState } from "react";
import { GetByLocTM } from "../ApiCalls/GetByLocTM";
import Checkbox from '@mui/material/Checkbox';
import "./chooseEvents.css"

function ChooseEvents() {
      const [location, setLocation] = useState(""); // save location
      const [events, setEvents] = useState(); 
      const [showEvents, setShowEvents] = useState(false);
   
    
      const handleChange = event => {
        setLocation(event.target.value);
      };
    

    async function handleSubmit(e){
        e.preventDefault();
        await getEvents(location)
        console.log("events set as:", events)
        setShowEvents(true);
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
    "venue" : result._embedded.venues["0"].name}});

    console.log("new Results" , newResults)
    await setEvents(newResults);
  }



  return (
    <div>
       <div className="form">
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            <input
              placeholder="enter your location"
              name="location"
              type="text"
              value={location}
              onChange={e => handleChange(e)}
            />
          </label>
          <button className="submit" type="submit">
            Submit
          </button>
         
        </form>
      </div>

    


     { showEvents &&
      <div className="show-choose-events">
       <h2>Events in {location}</h2>
       <div className="results-choose-events">
      {
      events.map(r => {
          return <div key={r.id} className="event-items">
              <Checkbox
                className="event-checkbox"
                value={r.id}
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


    </div>
  )
}

export default ChooseEvents
