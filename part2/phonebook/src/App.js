import { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import peopleService from './Service/PeopleService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    peopleService.getAll()
      .then(data => {
        setPersons(data)
        console.log(`Fetched ${data.length} people.`)
      })
      .catch(err => console.error(err))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (!newName) {
      alert('Name cannot be blank.')
      return
    }

    if (!newNumber) {
      alert('Number cannot be blank.')
      return
    }

    const match = persons.filter(person => person.name === newName)

    // Update or create?
    if (match.length) {
      const person = match[0]
      // Update or ignore?
      if (person.number !== newNumber) {
        peopleService.update(person.id, {...person, number: newNumber})
        .then(data => {
          setPersons(persons.map(person => 
            person.name === data.name
            ? data : person))
          clearScreen()
          console.log(`Updated ${data}`)
        })
        .catch(error => console.error(error))
      } else {
        alert(`${newName} is already added to phonebook.`)
      }
    } else {
        peopleService.create(newPerson)
          .then(data => {
            setPersons([...persons, data])
            clearScreen()
            console.log(`Created ${data}`)
          })
          .catch(error => console.error(error))
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
    peopleService.remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== Number(id)))
        console.log(`Removed id #${id} from phonebook.`)
      })
      .catch(err => console.log(`Failed to delete id#${id} due to ${err}`))
  }

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
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App