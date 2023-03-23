import convertCountryCode from "./convertCountryCode";


export default async function cityCountryAPIString(location) {
   
    let placeArr=  location.split(", ");
    let country= placeArr[placeArr.length -1]
    let city = placeArr[0]
    let countryCode = await convertCountryCode  (country);
    let urlString= `&locale=*&city=${city}&countryCode=${countryCode}`
  

    return {ccURL: urlString, country: "", city: "", countryCode: ""}
}

