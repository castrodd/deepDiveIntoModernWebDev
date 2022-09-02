import { useState, useEffect } from 'react'
import Filter from './Filter'
import Notification from './Notification'
import PeopleService from './Service/PeopleService'
import PersonForm from './PersonForm'
import Persons from './Persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    PeopleService.getAll()
      .then(data => {
        setPersons(data)
        console.log(`Fetched ${data.length} people.`)
      })
      .catch(err => console.error(err))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let newPerson = {
      name: newName,
      number: newNumber
    }

    if (!newName) {
      sendMessage('error', 'Name cannot be blank.')
      return
    }

    if (!newNumber) {
      sendMessage('error', 'Number cannot be blank.')
      return
    }

    const isMatch = persons.some(person => person.name === newName)

    // Update or create?
    if (isMatch) {
      const id = persons.find(person => person.name === newName).id
      PeopleService.update(id, newPerson)
        .then(data => {
          setPersons(persons.map(person =>
            person.name === newPerson.name
              ? data : person))
          clearScreen()
          sendMessage('notice', `User ${data.name} updated.`)
        })
        .catch(error => {
          console.log(error)
          sendMessage('error', `User could not be updated. Error: ${error.response.data.error}`)
        })
    } else {
      PeopleService.create(newPerson)
        .then(data => {
          setPersons([...persons, data])
          clearScreen()
          sendMessage('notice', `User ${data.name} created.`)
        })
        .catch(error =>
          sendMessage('error', `Failed to create user. Error: ${error.response.data.error}`))
    } 
  }

  const clearScreen = () => {
    setNewName('')
    setNewNumber('')
  }

  const addName = (event) => setNewName(event.target.value)

  const addNumber = (event) => setNewNumber(event.target.value)

  const addFilter = (event) => setFilter(event.target.value)

  const removePerson = (event) => {
    const id = event.target.value
    PeopleService.remove(id)
      .then(data => {
        setPersons(persons.filter(p => p.id !== id))
        sendMessage('notice', `User #${id} removed.`)
      })
      .catch(error => 
        sendMessage('error', `Failed to delete user #${id}. Error: ${error.response.data.error}`))
  }

  const sendMessage = (status, content) => {
    setMessage(
      {
        status: status,
        content: content
      }
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const filteredPersons =
    (filter !== '')
      ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      : persons

  return (
    <div>
      <Notification message={message} />
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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App