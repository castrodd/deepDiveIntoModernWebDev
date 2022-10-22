const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  published: {
    type: Number
  },
  author: {
    type: String,
    required: true
  },
  genres: {
    type: [String]
  }
})

module.exports = mongoose.model('Book', schema)