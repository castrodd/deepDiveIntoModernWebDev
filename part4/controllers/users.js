const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/', async (_, response) => {
    const users = await User.find({})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).send('User cannot be created.')
  }
  
})

module.exports = usersRouter