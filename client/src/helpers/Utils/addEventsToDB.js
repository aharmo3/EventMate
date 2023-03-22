import manageEventDetails from "./manageEventDetails";
// loops through the array, calling a function which prepares them for the database

export default async function addEventsToDB(objectIds, arrayOfObjects) {
arrayOfObjects.forEach((o) => {
    manageEventDetails(objectIds, o);});
};


