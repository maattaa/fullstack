import React from 'react';

const PrintPerson = ({ person }) =>
    <p key={person.name}>{person.name} {person.number}</p>

export default PrintPerson;