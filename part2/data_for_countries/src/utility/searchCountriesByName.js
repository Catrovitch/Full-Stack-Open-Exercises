function SearchCountriesByName(searchString, countriesArray) {
    const matchingCountries = [];
    countriesArray.forEach(country => {
        if (country.name.toLowerCase().includes(searchString.toLowerCase())) {
            matchingCountries.push(country);
        }
    });

    return matchingCountries;
}

export default SearchCountriesByName;
