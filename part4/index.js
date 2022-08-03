require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})