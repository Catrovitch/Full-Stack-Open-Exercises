import React from 'react'
import FormField from './FormField'
import CountriesList from './CountriesList';
import CountryInfomration from './CountryInformation';

const CountrySearch = ({ countries, formHeader, formFieldText, handleSearchText, showCountry, countryToShow, capitalWeather }) => {

    return (
        <div>
            <FormField 
                formHeader={formHeader}
                formFieldText={formFieldText}
                formOnChange={handleSearchText}
            />
            {countryToShow !== null ? (
                <CountryInfomration 
                    country= {countryToShow}
                    capitalWeather= {capitalWeather}
                />
            ) : countries.length > 10 || countries.length === 0 ? (
                <p>Too many matches, specify another filter</p>
            ) : (
                <CountriesList 
                    countries={countries}
                    showCountry={showCountry}
                />
            )}
        </div>
    );
}    
export default CountrySearch;
