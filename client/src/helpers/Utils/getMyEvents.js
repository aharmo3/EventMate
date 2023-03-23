//this function calls 2 other functions to collect info for event cards
//pass the result as props for event cards component to display events

import ClientAPI from "../ClientAPI";
import { GetEventsFromTicketMaster } from "../EventsApi/GetEventsFromTicketMaster";
import takeEventDetails from "./takeEventDetails";

export default async function getMyEvents(userId, numberToReturn){
    let dbData = await  ClientAPI.getUserEvents(userId)
    console.log("this is the db data array...", dbData.data)
    if(dbData.ok){
        if (numberToReturn.typeOf === "number" && dbData.data.length > numberToReturn){
        let dataArray = [...dbData.data];
        return dataArray.splice(0, numberToReturn)
        }else{
            return dbData.data;
        }
    }
}
