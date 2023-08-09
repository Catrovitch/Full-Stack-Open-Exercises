import React from "react"


const CountryName = ({country, showCountry}) => {
  return (
      <p>
        {country.name}
        <button onClick={() => showCountry(country.name)}>show</button>
      </p>
  )
}

export default CountryName