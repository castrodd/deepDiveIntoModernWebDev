const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

const baseUrl = '/api/blogs'

blogsRouter.get(baseUrl, (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.post(baseUrl, (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})

module.exports = blogsRouter