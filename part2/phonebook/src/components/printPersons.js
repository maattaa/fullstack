import React from 'react';
import PrintPerson from './printPerson';

const PrintPersons = ({ printPersons, setPersons }) => (
  printPersons.map((printPerson) =>
    <PrintPerson
      key={printPerson.id}
      person={printPerson}
      setPersons={setPersons}
      persons={printPersons}
    />)
);

export default PrintPersons;