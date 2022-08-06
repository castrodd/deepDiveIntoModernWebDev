const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('api: blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 30000)

test('api: a valid blog can be added', async () => {
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