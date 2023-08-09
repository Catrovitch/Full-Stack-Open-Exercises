

const CountryInfomration = ({country, captialWeather}) => {

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
        </div>
    )

}

export default CountryInfomration;