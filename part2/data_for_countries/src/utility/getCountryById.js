function GetCountryById(countryId, countriesArray) {
    console.log(countryId)
    console.log(countriesArray)
    const matchedCountry = countriesArray.find(country => country.id === countryId);
    return matchedCountry || null; // Return null if no match is found
}

export default GetCountryById