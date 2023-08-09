import CountrySearch from './components/CountrySearch'
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CreateCountryArray from './utility/createCountryArray'
import SearchCountriesByName from './utility/searchCountriesByName'
import GetCountryByName from './utility/getCountryByName'

const App = () => {
  const [formFieldText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])
  const [searchedCountries, setSearchedCountries] = useState(countries)
  const [countryToShow, setCountryToShow] = useState(null)


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
    const countryWithName = GetCountryByName(countryName, countries)
    setCountryToShow(countryWithName)
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
        ></CountrySearch>  
    </div>
  );
}

export default App;
