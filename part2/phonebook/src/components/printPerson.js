import React from 'react';
import personService from '../services/persons'

const PrintPerson = ({ person, persons, setPersons }) => {

    return (
        <p>{person.name} {person.number} &nbsp;
            <button onClick={() => {
                if (window.confirm(`Delete ${person.name}?`)) {
                    personService.delete(person.id)
                        .then(setPersons(persons.filter(p => p.id !== person.id)))
                        .catch(error => {
                            /*Should not ever be needed, but is fail safe is bugs occur*/
                            alert(`usser ${person.name} was already deleted from the server`)
                        }
                        )
                }
            }}>
                delete
    </button></p>
    )
}
export default PrintPerson;