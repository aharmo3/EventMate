import ClientAPI from "../ClientAPI";
import manageEventDetails from "./manageEventDetails";

export default async function addEventsToDB(objectIds, arrayOfObjects) {
arrayOfObjects.forEach((o) => {
    manageEventDetails(objectIds,o);});
};


