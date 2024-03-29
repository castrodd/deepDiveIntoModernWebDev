const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const peopleRouter = require('./controllers/people')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to MongoDB...')

mongoose.connect(config.MONGODB_URI)
  .then( () => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/people', peopleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app