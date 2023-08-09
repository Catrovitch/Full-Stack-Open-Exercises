function CreateCountryArray(countriesDictionary) {
    const countryArray = [];

    Object.keys(countriesDictionary).forEach(countryName => {
        const country = countriesDictionary[countryName];
        countryArray.push({
            name: country.name.common ? country.name.common : 'N/A',
            capital: country.capital ? country.capital : 'N/A',
            area: country.area ? country.area : 'N/A',
            languages: country.languages ? Object.values(country.languages) : 'N/A',
            flag: country.flags && country.flags.png ? country.flags.png : 'N/A',
        });
    });

    return countryArray;
}

export default CreateCountryArray;
