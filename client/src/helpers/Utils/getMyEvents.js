//this function calls 2 other functions to collect info for event cards
//pass the result as props for event cards component to display events

import { GetEventsFromTicketMaster } from "../EventsApi/GetEventsFromTicketMaster";

// import ClientAPI from "../ClientAPI";

export default async function getMyEvents(userId){
    let result=[];   

//  fetch request from db - array
    // const response = await ClientAPI.getUser()
    //     console.log("fetching user data...")
    //     console.log(response);

 //temp solution
 let dbData= ['Z698xZ2qZaFAa', 'Z698xZ2qZaFpc', 'Z698xZ2qZa6M-', 'Z698xZ2qZaFp2']
 
 //for every item -  call api by event id
 for (let i of dbData){
    let temp= await GetEventsFromTicketMaster("eventId", i);
    //current error means some return "undefined" - to make sure something still loads,
    // (and so we don't all get error messages) I added the if statement - but needs fixing
    if (temp){
        result.push(temp[0]);
    }else {
        //see which ones aren't fetching properly in the console
        console.log("API fetch error, returning 'undefined' for event ID: ", i);
    }
 }  //see the result from Ticketmaster in the console
 console.log("Events arrived from Ticketmaster...", result)
    return result;
}
