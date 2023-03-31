//import to any page with location as param

import cityCountryAPIString from "../Utils/cityCountryAPIString";
import { TICKET_MASTER_API_KEY } from "../../constants";

export async function GetByLocTM(location) {
  let EventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=`;
  let apiKey = TICKET_MASTER_API_KEY;

  let cityCountryString = await cityCountryAPIString(location);
  console.log("Fetching events....");

  // let fullUrl = EventUrl + apiKey + cityKey + city + countryExt + countryCode;
  let fullUrl = EventUrl + apiKey + cityCountryString.ccURL;
  // console.log("getting events in location: ", city, country);

  try {
    let response = await fetch(fullUrl);
    //  if response is ok
    if (response.ok) {
      // wait for data
      let ticketmaster = await response.json();

      console.log("Event data response: ", ticketmaster);

      return ticketmaster._embedded.events;
    } else {
      console.log("Server error:", response.status, response.statusText);
    }
  } catch (err) {
    console.log("Network error:", err);
  }
}
