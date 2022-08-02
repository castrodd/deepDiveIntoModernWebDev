require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

const baseUrl = '/api/blogs'

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

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

app.get(baseUrl, (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post(baseUrl, (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})