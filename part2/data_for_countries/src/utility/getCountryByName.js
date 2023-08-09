function GetCountryByName(countryName, countriesArray) {
    const matchedCountry = countriesArray.find(country => country.name.toLowerCase() === countryName.toLowerCase());
    return matchedCountry || null;
}

export default GetCountryByName