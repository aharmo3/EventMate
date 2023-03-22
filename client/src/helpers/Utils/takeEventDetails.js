
export default async function takeEventDetails (eventData, location){    

    let doesItExist = eventData.forEach()

    let newResults= eventData.map((result) => { 
    return {
    "id": result.id, 
    "name":result.name, 
    "image": result.images["0"].url, 
    "date" : result.dates.start.localDate, 
    "time" : result.dates.start.localTime, 
    "venue" : result._embedded.venues["0"].name,
    "currency": result.priceRanges["0"].currency,
    "startingPrice":  result.priceRanges["0"].min,
    "purchaseLink":  result.url,
    "genreId":  result.classifications["0"].genre.id,
    "genre": result.classifications["0"].genre.name,
    "subgenre": result.classifications["0"].subGenre.name,
    "eventType": result.classifications["0"].segment.name,
    "eventLocation": location}});


//     let newResults= eventData.map((result) =>{ 
//         return {"id": result.id, 
//         "name":result.name, 
//         "image": result.images["0"].url, 
//         "date" : result.dates.start.localDate, 
//         "time" : result.dates.start.localTime, 
//         "venue" : result._embedded.venues["0"].name,
//         // "currency": result.priceRanges["0"].currency,
//         // "startingPrice":  result.priceRanges["0"].min,
//         "purchaseLink":  result.url,
//         "genreId":  result.classifications["0"].genre.id,
//         "genre": result.classifications["0"].genre.name,
//         "subgenre": result.classifications["0"].subGenre.name,
//         "eventType": result.classifications["0"].segment.name,
//         "eventLocation": location}});

}



