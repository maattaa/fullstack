import React from 'react';
import Button from './button';

const PrintCountry = ({ country, setSearch }) => {
    return <p>{country.name} &nbsp;
    <Button handleClick={() => setSearch(country.name)} text="show" />
    </p>
}

export default PrintCountry;