const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401)
        .json({
          error: 'Missing or invalid token.'
        })
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog(request.body)

    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
  } catch(error) {
    console.log(error)
    return response.status(400).json(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { title, author, url, likes, user } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes, user },
      { new: true, runValidators: true, context: 'query' })

    response.json(updatedBlog)
  } catch {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401)
        .json({
          error: 'Missing or invalid token.'
        })
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(200).end()
    } else {
      response.status(400).json({error: "User token does not match blog's user."})
    } 
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = blogsRouter