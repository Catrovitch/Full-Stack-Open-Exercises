function ExtractWeatherData(weatherData) {
    return { temp: weatherData.main.temp, wind: weatherData.wind.speed, icon: weatherData.weather[0].icon };
}

export default ExtractWeatherData;