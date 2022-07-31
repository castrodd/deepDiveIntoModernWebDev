const mongoose = require('mongoose')
const password = encodeURIComponent(process.env.MONGO)
const url = `mongodb+srv://modernwebmongodb:${password}@cluster0.tdqhuhf.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validNumber = (number) => {
  const dashes = number.indexOf('-')
  if (dashes >= 0) {
    const validFormat = /[0-9]{2,3}[-][0-9]+/
    const validNumber = number.search(validFormat)
    return validNumber !== -1 ? true : false
  }
  return true
}

const personSchema = new mongoose.Schema({
  name: { 
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: validNumber
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)