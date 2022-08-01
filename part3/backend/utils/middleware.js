const morgan = require('morgan')

morgan.token('body', function getBody(req) {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return '[No body]'
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint!' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger, unknownEndpoint, errorHandler
}