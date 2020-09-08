import React from 'react';
import PrintPerson from './printPerson';

const PrintPersons = ({ printPersons }) => (
    printPersons.map((printPersons) => <PrintPerson person={printPersons} />)
  );

export default PrintPersons;