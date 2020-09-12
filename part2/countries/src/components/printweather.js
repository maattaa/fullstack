import React from 'react';

const PrintWeather = ({ weather, country }) => {

    if (weather === null) {
      return (<p>Loading weather in {country.capital}</p>)
    } else {
      return (
        <>
          <h3>Weather in {country.capital}</h3>
          <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
          {weather.current.weather_icons.map(i =>
            <img alt="Capital's weather symbol" id="weathersymbol" key={i} src={i} />)}
          <p><b>wind: </b> {Math.round(weather.current.wind_speed * 0.277777777778)} m/s direction {weather.current.wind_dir}</p>
        </>
      )
    }
  }

export default PrintWeather;