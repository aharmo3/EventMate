//import to any page with location as param



export async function GetByLocTM (location){
    let EventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=`;
    console.log("api", process.env);
    let apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
    let cityKey = "&locale=*&city="
      
        
        console.log("Fetching events....");
       
        let fullUrl = EventUrl + apiKey + cityKey + location;
        console.log("getting events in location: ",location);
   
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


