import React, {useEffect, useState} from 'react';
import axios from 'axios'
import PrintWeather from './printweather';

const PrintCountryDetails = ({ country }) => {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}&units=m`)
            .then(response => {
                setWeather(response.data)
            })
    }, [country]);

    return (
        <>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <img alt="Country's flag" id="flag" src={country.flag} />
            <PrintWeather weather={weather} country={country} />
        </>
    );
};

export default PrintCountryDetails;