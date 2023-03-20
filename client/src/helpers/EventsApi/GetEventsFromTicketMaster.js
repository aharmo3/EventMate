//import to any page and fetch data
//params fetchType - input a string "location", or "eventId"

import convertCountryCode from "../Utils/convertCountryCode";

export async function GetEventsFromTicketMaster (fetchType, info){
    let EventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=`;
    let apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
    let cityKey = "&locale=*&city=";
    let eventIDkey =  "&id=";
    let countryExt= "&countryCode=";
    let fullUrl = "";

  
      if (fetchType=== "location"){
          let locationArr= info.split(", ");
          let city = locationArr[0];
          let country = locationArr[locationArr.length[-1]];
          let countryCode = convertCountryCode(country);
          fullUrl = EventUrl + apiKey + cityKey + city + countryExt + countryCode;
      }if (fetchType === "eventId"){
          fullUrl = EventUrl + apiKey + eventIDkey + info; 
      }
        
    console.log("Fetching events....");
       
        console.log(`getting events by ${fetchType}: `, info);
   
          try {
            let response = await fetch(fullUrl);
            //  if response is ok
            if (response.ok) {
              // wait for data
              let ticketmaster = await response.json();
    
              console.log("Event data response: ", ticketmaster._embedded.events);
        
              return ticketmaster._embedded.events
            } else {
              console.log("Server error:", response.status, response.statusText);
            }
          } catch (err) {
            console.log("Network error:", err);
          }
      
       
      };