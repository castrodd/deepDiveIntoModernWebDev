require('dotenv').config();
const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', function getBody(req) {
    if (req.method === 'POST' || req.method === 'PUT') {
      return JSON.stringify(req.body)
    }
    return '[No body]'
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    const total = people.length
    const content = `<p>Phonebook has info for ${total} people</p>` 
    const timeStamp = `<p>${new Date()}</p>`
    response.send(`${content} ${timeStamp}`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => response.json(people))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.post('/api/persons/', (request, response) => {
  const requestOk = () => request.body && request.body.name && request.body.number
  const newName = () => !persons.filter(p => p.name === request.body.name).length

  if (requestOk()) {
    if (newName()) {
      const person = new Person({
        name: request.body.name,
        number: request.body.number
      })

      person.save().then(savedPerson => {
        response.json(savedPerson)
      })
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
  Person.findByIdAndDelete(request.params.id)
    .then(person => response.json(person))
    .catch(error => response.status(400).json(error))
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint!' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})