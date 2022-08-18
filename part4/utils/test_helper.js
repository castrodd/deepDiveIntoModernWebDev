const User = require('../models/users')

const initialBlogs = [
    {
        "title": "That's a Blog",
        "author": "Some Body",
        "url": "www.blog.dev",
        "likes": 3
      },
      {
        "title": "So Bloggy",
        "author": "You Know",
        "url": "www.bloggy.co",
        "likes": 11
      },
      {
        "title": "Blogtown",
        "author": "Dez Diaz",
        "url": "www.suchablog.es",
        "likes": 7
      },
      {
        "title": "More Blog",
        "author": "W. Ferrell",
        "url": "moreblogbell.web",
        "likes": 17
      }
]

const initialUsers = [
  {
    name: 'Some Body',
    username: 'somebody',
    password: 'someword'
  },
  {
    name: 'Some Body 2',
    username: 'somebody2',
    password: 'someword'
  },
  {
    name: 'Some Body3',
    username: 'somebody3',
    password: 'someword'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    usersInDb
}