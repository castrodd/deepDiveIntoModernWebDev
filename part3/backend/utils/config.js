require('dotenv').config()

const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const MONGODB_URI = `mongodb+srv://modernwebmongodb:${password}@cluster0.tdqhuhf.mongodb.net/phonebook?retryWrites=true&w=majority`
const PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT
}