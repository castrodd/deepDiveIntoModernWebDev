const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
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

describe('Testing PUT calls...', () => {
  test('api integration: PUT call works', async () => {
    const response = await api.get('/api/blogs')
    const index = Math.floor(Math.random()*helper.initialBlogs.length)
    const oldBlog = response.body[index]

    const updatedBlog = await api.put(`/api/blogs/${oldBlog._id}`)
      .set('Content-Type', 'application/json')
      .send('{"title":"Updated","author":"api", "url":"jest.dev"}')
    
    const newResponse = await api.get('/api/blogs')
    const newBlog = newResponse.body[index]

    expect(updatedBlog.statusCode).toEqual(200)
    expect(newBlog.title).toEqual('Updated')
    expect(newBlog.likes).toEqual(oldBlog.likes)
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

describe('Testing USER endpoints...', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('hushhush', 10)
    const user = new User({username: 'first', passwordHash})

    await user.save()
  })

  test('api integration: GET users', async () => {
    const response = await api.get('/api/users')

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(1)
    expect(response.body[0].username).toEqual('first')
  })

  test('api integration: POST users', async () => {
    const initialUsers = await helper.usersInDb()

    const newUser = {
      name: 'Some Body',
      username: 'somebody',
      password: 'somewords'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const currentUsers = await helper.usersInDb()
    expect(currentUsers.length - initialUsers.length).toEqual(1)

    const userNames = currentUsers.map(user => user.username)
    expect(userNames).toContain('somebody')
  })

  test('api integration: POST fails when missing username', async () => {
    const newUser = {
      name: 'Some Body',
      password: 'somewords'
    }

    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toEqual(400)
    expect(response.error.text).toContain('ValidationError')
  })

  test('api integration: POST fails when missing password', async () => {
    const newUser = {
      username: 'thisissomeuser',
      name: 'Some Body'
    }

    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toEqual(400)
    expect(response.error.text).toBe('User cannot be created. Password must be provided.')
  })

  test('api integration: POST fails when username too short', async () => {
    const newUser = {
      username: 'a',
      name: 'Some Body',
      password: 'somewords'
    }

    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toEqual(400)
    expect(response.error.text).toContain('ValidationError')
  })

  test('api integration: POST fails when password too short', async () => {
    const newUser = {
      username: 'thisissomeuser',
      name: 'Some Body',
      password: 'a'
    }

    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toEqual(400)
    expect(response.error.text).toBe('User cannot be created. Password must be at least 8 characters long.')
  })

  test('api integration: POST fails when username not unique', async () => {
    const newUser = {
      username: 'uniqueuser',
      name: 'Some Body',
      password: 'somewords'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
    
    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toEqual(400)
    expect(response.error.text).toContain('duplicate key error')
  })
})

afterAll(() => {
  mongoose.connection.close()
})