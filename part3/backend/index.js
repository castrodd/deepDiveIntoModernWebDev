require('dotenv').config();
const { request, response } = require('express')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function getBody(req) {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return '[No body]'
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const requestOk = () => request.body && request.body.name && request.body.number
  const newName = () => Person.find({name: request.body.name}).then(res => res.length)

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
        error: 'Request must contain name and number.'
      })
    }
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => response.status(204).json(person))
    .catch(error => next(error))
  })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint!' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Malformed id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})