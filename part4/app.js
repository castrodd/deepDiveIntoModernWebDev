require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const mongoUrl = `mongodb+srv://modernwebmongodb:${password}@cluster0.tdqhuhf.mongodb.net/blogApp?retryWrites=true&w=majority`

console.log('Connecting to MongoDB...')
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