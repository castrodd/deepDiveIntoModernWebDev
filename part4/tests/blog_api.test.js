const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('api integration: GET', async () => {
  const response = await api.get('/api/blogs')

  expect(response.status).toEqual(200)
  expect(response.headers['content-type']).toContain('application/json')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 30000)

test('api integration: POST', async () => {
  const newBlog = {
    title: "That's My Blog!",
    author: "Annie Bodie",
    url: "www.blogger.jp",
    likes: 30,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  expect(contents).toContain('Annie Bodie')
})

afterAll(() => {
  mongoose.connection.close()
})