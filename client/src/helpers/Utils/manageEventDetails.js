
// --------------------------------------------------------------------------------------------
                                //CURRENTLY NOT BEING USED
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------


// import ClientAPI from "../ClientAPI";


// export default async function manageEventDetails (objectids, object){

// for (let i of object){

//     if (objectids.includes(i.id)){
//    let eventID= i.id
//    let eventExists= await ClientAPI.getEventDetails(eventID)
//     if (eventExists.data !== null){
//         return 
//         } else{
//             console.log("sending event details to database....")

//             let evLocation = null;
//             let evCurrency=null;
//             let evStartPrice = null;
//             let pLink = null;
//             let genr= null;
//             let subg = null;
//             let evHost= null;
//             let evType= null;

//             if(i.eventLocation)
//                 evLocation= i.eventLocation
//             if(i.currency)
//                 evCurrency = i.currency;
//             if (i.startingPrice)
//                 evStartPrice = i.startingPrice
//             if (i.purchaseLink)
//                 pLink = i.purchaseLink
//             if (i.genre)
//                 genr= i.genre
//             if (i.subgenre)
//                 subg= i.subgenre
//             if (i.eventHost)
//                 evHost= i.eventHost
//             if (i.eventType)
//                 evType = i.eventType
            



//             console.log("the stuff getting sent to db ....",);
//          let result=  await  ClientAPI.addEventDetails( i.id, i.name, i.date , i.time , 
//                 i.image, evLocation, i.venue, evCurrency, evStartPrice, pLink, genr, 
//                 subg, evHost,  evType)
//                 console.log("magage event deetsssssss", result)
//                 return result;
//         }
//     }
//     }
// }
