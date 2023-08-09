import React from "react"
import CountryName from './CountryName'

const CountriesList = ({countries, showCountry}) =>  {
    return (
        <>
          {countries.map((country, index) => (
            <CountryName
              key={index}
              country={country}
              showCountry={showCountry}
            ></CountryName>
          ))}
        </>
    )
}

export default CountriesList