import React from 'react';
import PrintPersons from './printPersons';

//Show all results if there is no search query, or 
//search from names and numbers
const Results = ({ search, persons, setPersons }) => (
  (search.length === 0)
    ? <PrintPersons
      printPersons={persons}
      setPersons={setPersons} />
    : <PrintPersons
      printPersons={persons.filter(person =>
        person.name.toLowerCase().includes(search.toLowerCase())
        || person.number.includes(search))}
      setPersons={setPersons} />
);

export default Results