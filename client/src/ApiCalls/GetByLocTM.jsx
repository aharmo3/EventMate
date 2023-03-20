//import to any page with location as param

import convertCountryCode from "../helpers/Utils/convertCountryCode";



export async function GetByLocTM (city, country){
    let EventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=`;
    let apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
    let cityKey = "&locale=*&city=";
    let countryExt= "&countryCode=";
    let countryCode = convertCountryCode(country);
    console.log("get by location - country code: ", countryCode);  
        
        console.log("Fetching events....");
       
        let fullUrl = EventUrl + apiKey + cityKey + city + countryExt + countryCode;
        console.log("getting events in location: ", city);
   
          try {
            let response = await fetch(fullUrl);
            //  if response is ok
            if (response.ok) {
              // wait for data
              let ticketmaster = await response.json();
    
              console.log("Event data response: ", ticketmaster);
        
              return ticketmaster._embedded.events
            } else {
              console.log("Server error:", response.status, response.statusText);
            }
          } catch (err) {
            console.log("Network error:", err);
          }
      
       
      };


