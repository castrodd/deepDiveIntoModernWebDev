const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
  } catch(error) {
    return response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(200).end()
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = blogsRouter