import React, { useState } from 'react'
//added below
import Search from './components/search';
import EntryForm from './components/entryForm';
import Results from './components/results';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])

    //loop over name input
    const [newName, setNewName] = useState('')
    //loop over phonenumber
    const [newNumber, setNewNumber] = useState('')
    //loop over search
    const [search, setSearch] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const newObject = {
            name: newName,
            number: newNumber
        };
        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
          window.alert(`${newName} is already added to phonebook`)
        } else {
          setPersons(persons.concat(newObject))
          setNewName('')
          setNewNumber('')
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