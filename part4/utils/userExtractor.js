const User = require('../models/users')
const jwt = require('jsonwebtoken')

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401)
        .json({
          error: 'Missing or invalid token.'
        })
    }

    const user = await User.findById(decodedToken.id)
    request.user = user

    next()
}

module.exports = { userExtractor }