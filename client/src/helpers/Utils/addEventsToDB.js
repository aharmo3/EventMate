
import ClientAPI from "../ClientAPI";
// loops through the array, calling a function which prepares them for the database

export default async function addEventsToDB(objectIds, arrayOfObjects) {

let responseArr = [];

for (let i of arrayOfObjects){
    
   let eventID= i.id;
    console.log("events DB ..event id...", eventID)
   
    if (objectIds.includes(eventID)){
      
   let eventExists= await ClientAPI.getEventDetails(eventID)

    if (eventExists.data.length > 2 ){
     
        } else{
            console.log("event does not exist in db", eventID)
            console.log("events DB preparing to send event details to database....")

            let evLocation = null;
            let evCurrency=null;
            let evStartPrice = null;
            let pLink = null;
            let genr= null;
            let subg = null;
            let evHost= null;
            let evType= null;

            if(i.eventLocation)
                evLocation= i.eventLocation
            if(i.currency)
                evCurrency = i.currency;
            if (i.startingPrice)
                evStartPrice = i.startingPrice
            if (i.purchaseLink)
                pLink = i.purchaseLink
            if (i.genre)
                genr= i.genre
            if (i.subgenre)
                subg= i.subgenre
            if (i.eventHost)
                evHost= i.eventHost
            if (i.eventType)
                evType = i.eventType


            console.log("the stuff getting sent to db ....", i.id, i.name, i.date , i.time , 
            i.image, evLocation, i.venue, evCurrency, evStartPrice, pLink, genr, 
            subg, evHost,  evType);
         let result=  await  ClientAPI.addEventDetails( i.id, i.name, i.date , i.time , 
                i.image, evLocation, i.venue, evCurrency, evStartPrice, pLink, genr, 
                subg, evHost,  evType)
               
                responseArr.push(result.ok)
        }
    }
    }
    return responseArr;
};


