import React, { useState } from 'react'

//added
import ReactDOM from 'react-dom';

const PrintPersons = ({ printPersons }) => (
  printPersons.map((printPersons) => <p key={printPersons.name}>{printPersons.name} {printPersons.number}</p>)
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  //state to loop over name input
  const [newName, setNewName] = useState('')
  //loop over phonenumber
  const [newNumber, setNewNumber] = useState('')
  //loop over search
  const [search, setSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    };

    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
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

  //Show all results if there is no search query, or 
  //search from names and numbers
  const resultsToShow = (search.length === 0)
    ? <PrintPersons printPersons={persons} />
    : <PrintPersons printPersons={persons.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
      || person.number.includes(search))} />

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with <input
            value={search}
            onChange={handleSearch}
          />
        </div>
      </form>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNewName}
          /></div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNewNumber}
          /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {resultsToShow}
    </div >
  )
}

//added
ReactDOM.render(<App />, document.getElementById('root'))

export default App