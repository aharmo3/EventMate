
//This function is to take info about events without errors for the inconsistent values
// - things that return as null or undefined

export default async function takeEventDetails (eventData,location){    

    let result= eventData;
    let eventObject = {};

        eventObject.id = result.id; 
        eventObject.name= result.name; 
        eventObject.image= result.images["0"].url; 
        eventObject.date = result.dates.start.localDate; 
        eventObject.time= result.dates.start.localTime; 
        eventObject.venue = result._embedded.venues["0"].name;
      
        if  (result.priceRanges["0"].currency)  {
       eventObject.currency =result.priceRanges["0"].currency}
       if (result.priceRanges["0"].min){
        eventObject.startingPrice =  result.priceRanges["0"].min;
       } if (result.url){
            eventObject.purchaseLink = result.url;
        } if (result.classifications["0"].genre.name){
            eventObject.genre = result.classifications["0"].genre.name;
        } if (result.classifications["0"].subGenre.name){
            eventObject.subgenre = result.classifications["0"].subGenre.name;
        } if (result.classifications["0"].segment.name){
            eventObject.eventType = result.classifications["0"].segment.name;
        } if (location){
            eventObject.location = location;
        }
        

            return eventObject;

}



