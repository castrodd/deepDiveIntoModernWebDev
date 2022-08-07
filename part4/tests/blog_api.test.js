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

describe('Testing GET calls...', () => {
  test('api integration: GET', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.status).toEqual(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 30000)
})

describe('Testing POST calls...', () => {
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
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })
  
  test('api integration: POST has default for like prop', async () => {
    const newBlog = {
      title: 'So Much Blog!',
      author: 'Ann Bo',
      url: 'www.bl.bk',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.filter(blog => blog.author === 'Ann Bo')
  
    expect(contents[0].likes).toBe(0)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })
  
  test('api integration: POST fails without title', async () => {
    const newBlog = {
      author: 'Cardi B',
      url: 'www.blg.dr',
      likes: 11
    }
  
    const response = await api.post('/api/blogs').send(newBlog)
      
    expect(response.statusCode).toBe(400)
  })
  
  test('api integration: POST fails without url', async () => {
    const newBlog = {
      title: 'This Will Not Work',
      author: 'Cardi B',
      likes: 232
    }
  
    const response = await api.post('/api/blogs').send(newBlog)
      
    expect(response.statusCode).toBe(400)
  })
})

describe('Testing DELETE calls...', () => {
  test('api integration: DELETE call works', async () => {
    const response = await api.get('/api/blogs')
    const oldLength = response.body.length

    const id = response.body[0]._id
    const deletedBlog = await api.delete(`/api/blogs/${id}`)

    const newResponse = await api.get('/api/blogs')
    const newLength = newResponse.body.length

    expect(deletedBlog.statusCode).toEqual(200)
    expect(oldLength - newLength).toEqual(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})