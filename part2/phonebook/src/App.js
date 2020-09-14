import React, { useState, useEffect } from 'react'
//added below
import Search from './components/search';
import EntryForm from './components/entryForm';
import Results from './components/results';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([])
    //loop over name input
    const [newName, setNewName] = useState('')
    //loop over phonenumber
    const [newNumber, setNewNumber] = useState('')
    //loop over search
    const [search, setSearch] = useState('')

    useEffect(() => {

        personService
            .getAll()
            .then(response =>
                setPersons(response))
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName,
            number: newNumber,
            //find current largest ID in persons and increment it by 1
            id: persons.reduce((max, person) => (person.id > max ? person.id : max), persons[0].id  ) +1
        };
        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            window.alert(`${newName} is already added to phonebook`)
        } else {
            personService.create(newObject)
                .then(
                    setNewName(''),
                    setNewNumber(''),
                    setPersons(persons.concat(newObject)))
        };
    };

    const handleNewName = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Search search={search} handleSearch={handleSearch} />

            <h2>Add a new</h2>
            <EntryForm addPerson={addPerson} handleNewName={handleNewName} handleNewNumber={handleNewNumber}
                newName={newName} newNumber={newNumber} />

            <h2>Numbers</h2>
            <Results search={search} persons={persons} />
        </div >
    )
}

export default App