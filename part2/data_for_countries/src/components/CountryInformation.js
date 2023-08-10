

const CountryInfomration = ({country, capitalWeather}) => {
    return (
        <div>
          <h1>{country.name}</h1>
          <p></p>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>

          <h2>languages:</h2>

          <ul>
            {country.languages.map((language, index) => (
                <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={country.flag}></img>
          <h2>Weather in {country.capital}</h2>
          {capitalWeather && capitalWeather.temp ? (
            <p>Temperature: {capitalWeather.temp} Celsius</p>
            ) : (
            <p>Temperature data is not available.</p>
            )}

            {capitalWeather && capitalWeather.icon ? (
                <img src={`https://openweathermap.org/img/wn/${capitalWeather.icon}@2x.png`}></img>
            ) : null}

            {capitalWeather && capitalWeather.wind ? (
            <p>wind {capitalWeather.wind} m/s</p>
            ) : null}
        </div>
    )

}

export default CountryInfomration;