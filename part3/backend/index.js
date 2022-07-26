const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

morgan.token('body', function getBody(req) {
    if (req.method == 'POST') {
      return JSON.stringify(req.body)
    }

    return '[No body]'
  })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const total = persons.length
  const content = `<p>Phonebook has info for ${total} people</p>` 
  const timeStamp = `<p>${new Date()}</p>`
  response.send(content + timeStamp)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter(p => p.id === id)

  if (person) {
    response.json(...person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons/', (request, response) => {
  const requestOk = () => request.body && request.body.name && request.body.number
  const newName = () => !persons.filter(p => p.name === request.body.name).length

  if (requestOk()) {
    if (newName()) {
      const newPerson = {
        id: Math.floor(Math.random() * Math.pow(10, 10)),
        name: request.body.name,
        number: request.body.number
      }

      persons.push(newPerson)
      response.status(200).end()
    } else {
        response.status(400).json({
          error: 'Name already exists in database.'
        })
    }
  } else {
      response.status(400).json({
        error: 'Request body does not contain name and number.'
      })
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const filteredPersons = persons.filter(p => p.id !== id)

  if (persons.length === filteredPersons.length) {
    response.status(400).json({
      error: 'Person does not exist in database.'
    })
  }

  persons = filteredPersons
  response.status(200).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})