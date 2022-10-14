const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const user = require('../utils/userExtractor')

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({}).find({})
    .populate('user', { username: 1, name: 1 })
  return response.json(blogs)
})
  
blogsRouter.post('/', user.userExtractor, async (request, response) => {
  try {
    const user = request.user
    const blog = new Blog(request.body)
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    return response.status(201).json(result)
  } catch(error) {
    return response.status(400).json(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const { title, author, url, likes, user, comments } = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes, user, comments },
      { new: true, runValidators: true, context: 'query' })
      .populate('user', { username: 1, name: 1 })

    response.json(updatedBlog)
  } catch {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', user.userExtractor, async (request, response) => {
  try {
    const user = request.user
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