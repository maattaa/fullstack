import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/searchbar';
import PrintCountries from './components/printcountries';


function App() {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className="App">
      <SearchBar search={search} handleSearch={handleSearch} />
      <PrintCountries
        key={countries.name}
        countries={countries}
        search={search}
        setSearch={setSearch} />
    </div>
  );
}

export default App;
