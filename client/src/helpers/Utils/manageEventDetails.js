import ClientAPI from "../ClientAPI";


export default async function manageEventDetails (objectids, object){



    if (objectids.includes(object.id)){
   let eventID= object.id
   let eventExists= await ClientAPI.getEventDetails(eventID)
    if (eventExists.data !== null){
        return 
        } else{
            console.log("sending event details to database....")

            let evLocation ="";
            let evCurrency="";
            let evStartPrice = "";
            let pLink = "";
            let genr= "";
            let subg = "";
            let evHost= "";
            let evType= "";

            if(object.eventLocation){
                evLocation= object.eventLocation
            }if(object.currency){
                evCurrency = object.currency;
            }if (object.startingPrice){
                evStartPrice = object.startingPrice
            }if (object.purchaseLink){
                pLink = object.purchaseLink
            }if (object.genre){
                genr= object.genre
            }if (object.subgenre){
                subg= object.subgenre
            }if (object.eventHost){
                evHost= object.eventHost
            } if (object.eventType){
                evType = object.eventType
            }



            console.log("the stuff getting sent to db ....",);
             ClientAPI.addEventDetails( object.id, object.name, object.date , object.time , 
                object.image, evLocation, object.venue, evCurrency, evStartPrice, pLink, genr, 
                subg, evHost,  evType)
        }
    }
}
