
//takes an array of events from the Ticket Master events api
//number is the amount you want displayed - put "all" for all results
//compares the first 5 characters of the first event so that it isn't repeated
// we can build this out to compare the first 5 of each
//  - for now this works because the first result is most often repeated


export default function noRepeatEvents(data, amount){
let noRepeatResults=[data[0]];
let compareStr= data[0].name.slice(0,5)
for(let i of data){
    if (! i.name.includes(compareStr)){
        noRepeatResults.push(i)
    }  
} console.log("shorter array for results", compareStr, noRepeatResults)

// shortening results to max of amount
    let shortResults=[];
    if (amount!== "all" && noRepeatResults.length > amount){
    shortResults = noRepeatResults.slice(0, amount); 
    return shortResults;
    } else{
      return noRepeatResults;  
    }   
    

};