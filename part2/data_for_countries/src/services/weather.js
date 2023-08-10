import axios from 'axios'

const one_weather_api_key = process.env.REACT_APP_ONE_WEATHER_API

const baseUrl = `http://api.openweathermap.org/`

const getCapitalCoords = (country) => {
    const request = axios.get(`${baseUrl}geo/1.0/direct?q=${country.capital}&limit=${1}&appid=${one_weather_api_key}`)
    return request.then(request => request.data)
    
}

const getWeatherByCoords = (capitalCoords) => {
    const lat = capitalCoords.lat
    const lon = capitalCoords.lon

    const requestUrl = `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${one_weather_api_key}&units=metric`
    const request = axios.get(requestUrl)
    return request.then(request => request.data)    
}


export default { getCapitalCoords, getWeatherByCoords }
