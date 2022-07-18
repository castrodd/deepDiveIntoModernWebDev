import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (persons.every(person => person.name !== newName)) {
      if (newNumber) {
        setPersons([...persons, newPerson])
      }
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const addName = (event) => setNewName(event.target.value)
  const addNumber = (event) => setNewNumber(event.target.value)
  const addFilter = (event) => setFilter(event.target.value)

  const filteredPersons =
    (filter !== '')
      ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={addFilter} />
      <h3>Add Person</h3>
      <PersonForm 
        formSubmit={addPerson}
        name={newName} 
        nameChange={addName} 
        number={newNumber} 
        numberChange={addNumber} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App