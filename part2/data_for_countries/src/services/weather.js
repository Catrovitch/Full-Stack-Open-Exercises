import axios from 'axios'

const one_weather_api_key = process.env.REACT_APP_ONE_WEATHER_API

const baseUrl = `http://api.openweathermap.org/`
const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?`

const getCapitalCoords = (country) => {
    const request = axios.get(`${baseUrl}geo/1.0/direct?q=${country.capital}&limit=${1}&appid=${one_weather_api_key}`)
    const requestData = request.then(request => request.data)
    console.loog('RequestData: ', requestData)
}

const getWeatherByCoords = (capitaCoords) => {
    const request = axios.get(`${baseUrl}?`)
    console.log('At getWeatherByCoords')
}
    


export default { getCapitalCoords, getWeatherByCoords }
