import React from 'react';
import PrintCountry from './printcountry';
import PrintCountryDetails from './printcountrydetails';

const PrintCountries = ({ countries, search, setSearch }) => {

    const results = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    if (results.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else if (results.length === 1) {
        return (
            results.map(c => <PrintCountryDetails key={c.name} country={c} />)
        )
    } else {
        return (
            results.map(c => <PrintCountry key={c.name} country={c} setSearch={setSearch} />))
    }
}

export default PrintCountries;