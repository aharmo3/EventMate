import React, { useState, useEffect } from "react";
import { GetByLocTM } from "../helpers/EventsApi/GetByLocTM";
import Checkbox from "@mui/material/Checkbox";
import "./chooseEvents.css";
import { useNavigate } from "react-router-dom";
import NextBar from "./NextBar";
import ClientAPI from "../helpers/ClientAPI";
import Local from "../helpers/Local";
import addEventsToDB from "../helpers/Utils/addEventsToDB";
import LocationDropdown from "./Registration/LocationDropdown";
import Form from "./Form";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EventCard from "./EventCard";
function ChooseEvents() {
  const navigate = useNavigate();
  const userInfo = Local.getUser();
  const userLocation = userInfo.location;
  const [location, setLocation] = useState(userLocation);
  const [events, setEvents] = useState();
  const [showEvents, setShowEvents] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [chosenEvents, setChosenEvents] = useState([]);

  //Loads with user's current country in DB when loading
  useEffect(() => {
    getLocation();
  }, []);

  //gets user location from local storage and sets it
  async function getLocation() {
    await getEvents(userLocation);
  }

  async function getEvents(location) {
    let results = await GetByLocTM(location);
    //formatting the object to only take what we need
    let newResults = results.map((result) => {
      return {
        id: result.id,
        name: result.name,
        image: result.images["0"].url,
        date: result.dates.start.localDate,
        time: result.dates.start.localTime,
        venue: result._embedded.venues["0"].name,
        // "currency": result.priceRanges["0"].currency,
        // "startingPrice":  result.priceRanges["0"].min,
        // "purchaseLink":  result.url,
        // "genreId":  result.classifications["0"].genre.id,
        // "genre": result.classifications["0"].genre.name,
        // "subgenre": result.classifications["0"].subGenre.name,
        // "eventType": result.classifications["0"].segment.name,
        // "eventLocation": location
      };
    });
    console.log("new Results", newResults);
    await setEvents(newResults);
    setShowEvents(true);
  }

  function handleCheckBoxChange(event) {
    let eventId = event.target.value;
    let checkedEvents = [...chosenEvents];
    console.warn(checkedEvents);
    if (checkedEvents.includes(eventId)) {
      let idIndex = checkedEvents.indexOf(eventId);
      checkedEvents.splice(idIndex, 1);
      setChosenEvents(checkedEvents);
    } else {
      checkedEvents.push(eventId);
      setChosenEvents(checkedEvents);
    }
    console.log(chosenEvents);
  }

  const handleLocationChange = async (form) => {
    await getEvents(form.location);
    setLocation(form.location);
    setShowEdit(!showEdit);
    console.log("events set as:", events);
  };

  async function handleSend() {
    // loading
    let userId = userInfo.userId;
    let toPost = await chosenEvents.forEach((c) => {
      ClientAPI.addToUserEvents(userId, c);
    });
    let newEvents = addEventsToDB(chosenEvents, events);
    console.log(newEvents);
    //if return is successful - success message
    // route to next page

    navigate("/matched");
  }

  return (
    <div>
      <div>
        <h2 className="choose-events">
          Events Near&nbsp;
          {!showEdit && (
            <>
              {location}
              <IconButton color="secondary" aria-label="Search">
                <EditIcon
                  onClick={() => {
                    setShowEdit(!showEdit);
                  }}
                />
              </IconButton>
            </>
          )}
          {showEdit && (
            <Form
              formInitialValues={{ location: "" }}
              onFormChange={handleLocationChange}
            >
              <LocationDropdown
                label="Location"
                name="location"
                defaultValue={userLocation}
              />
            </Form>
          )}
        </h2>
      </div>
      {showEvents && (
        <div className="show-choose-events">
          <div className="results-choose-events">
            {events.map((r) => {
              return (
                <div key={r.id} className="event-items">
                  <Checkbox
                    className="event-checkbox"
                    value={r.id}
                    onChange={handleCheckBoxChange}
                    inputProps={{
                      "aria-label": "Checkbox A",
                    }}
                  />
                  <EventCard r={r} />
                  {/* <img src={r.image} alt="" className="event-img" />
                  <p className="event-title">{r.name}</p>
                  <p className="event-date-time">
                    {r.date} | {r.time}
                  </p>
                  <p className="event-venue">{r.venue}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* <NextBar
        activeStep={1}
        nextCb={(e) => {
          handleSend();
        }}
        prevCb={() => {
          navigate("/register-two");
        }}
      /> */}
    </div>
  );
}

export default ChooseEvents;
