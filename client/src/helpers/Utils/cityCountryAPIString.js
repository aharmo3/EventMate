import convertCountryCode from "./convertCountryCode";


export default async function cityCountryAPIString(location) {
    
    
    console.log("location in get by location", location)
    let placeArr=  location.split(", ");
    console.log("place array in get by location", placeArr)
    let country= placeArr[placeArr.length -1]
    let city = placeArr[0]
    let countryCode = await convertCountryCode  (country);
    console.log("in get by location city: ", city, ", country: ", country, ", country code: ", countryCode)

    let urlString= `&locale=*&city=${city}&countryCode=${countryCode}`
    console.log("{ccURL: urlString, country: , city: , countryCode: }", {ccURL: urlString, country: "", city: "", countryCode: ""})

    return {ccURL: urlString, country: "", city: "", countryCode: ""}
}

