require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

const password = config.PASSWORD
const mongoUrl = `mongodb+srv://modernwebmongodb:${password}@cluster0.tdqhuhf.mongodb.net/blogApp?retryWrites=true&w=majority`

logger.info('Connecting to MongoDB...')
mongoose.connect(mongoUrl)
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