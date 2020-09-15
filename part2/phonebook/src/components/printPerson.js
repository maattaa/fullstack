import React from 'react';
import personService from '../services/persons'

const PrintPerson = ({ person, persons, setPersons }) => {

    return (
        <p>{person.name} {person.number} &nbsp;
            <button onClick={() =>
                personService.delete(person.id)
                .then(setPersons(persons.filter(p => p.id !== person.id)))
            }>
                delete
    </button></p>
    )
}
export default PrintPerson;