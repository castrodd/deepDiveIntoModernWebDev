require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

logger.info('Connecting to MongoDB...')
mongoose.connect(config.URL)
  .then( () => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.info('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app