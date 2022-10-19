const peopleRouter = require('express').Router()
const People = require('../models/people')

peopleRouter.get('/info', (request, response) => {
  People.find({}).then(people => {
    const total = people.length
    const content = `<p>Phonebook has info for ${total} people</p>`
    const timeStamp = `<p>${new Date()}</p>`
    response.send(`${content} ${timeStamp}`)
  })
})

peopleRouter.get('/', (request, response) => {
  People.find({}).then(people => response.json(people))
})

peopleRouter.get('/:id', (request, response, next) => {
  People.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

peopleRouter.post('/', (request, response, next) => {
  const person = new People({
    name: request.body.name,
    number: request.body.number
  })

  person.save()
    .then(savedPeople => {
      response.json(savedPeople)
    })
    .catch(error => next(error))
})

peopleRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  People.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPeople => response.json(updatedPeople))
    .catch(error => next(error))
})

peopleRouter.delete('/:id', (request, response, next) => {
  People.findByIdAndDelete(request.params.id)
    .then(person => {
      console.log(person)
      response.status(204).json(person)
    })
    .catch(error => next(error))
})

module.exports = peopleRouter