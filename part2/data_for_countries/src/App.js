import CountrySearch from './components/CountrySearch'
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CreateCountryArray from './utility/createCountryArray'
import SearchCountriesByName from './utility/searchCountriesByName'
import GetCountryByName from './utility/getCountryByName'
import weatherService from './services/weather'
import GetCoords from './utility/getCoords'

const App = () => {
  const [formFieldText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState(countries)
  const [countryToShow, setCountryToShow] = useState(null)
  const [capitalInfo, setCapitalInfo] = useState(null)
  const [capitalWeather, setCapitalWeather] = useState(null)


  const handleSearchText = (event) => {
    const searchText = event.target.value
    setSearchText(searchText)
    const updatedSearchedCountries  = SearchCountriesByName(searchText, countries)
    setSearchedCountries(updatedSearchedCountries)
    setCountryToShow(null)
  }

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        const countryArray = CreateCountryArray(initialCountries)
        setCountries(countryArray)
      })
  }, [])

  const showCountry = countryName => {
    const country = GetCountryByName(countryName, countries)
    setCountryToShow(country)
  }


  return (
    <div>
      <CountrySearch
        countries={searchedCountries}
        formHeader='find countries'
        formFieldText={formFieldText}
        handleSearchText={handleSearchText}
        showCountry={showCountry}
        countryToShow={countryToShow}
        capitalWeather={capitalWeather}
        ></CountrySearch>  
    </div>
  );
}

export default App;
