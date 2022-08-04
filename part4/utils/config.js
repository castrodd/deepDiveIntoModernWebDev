require('dotenv').config()

const PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)
const URL = `mongodb+srv://modernwebmongodb:${PASSWORD}@cluster0.tdqhuhf.mongodb.net/blogApp?retryWrites=true&w=majority`
const PORT = process.env.PORT

module.exports = {
  PASSWORD,
  URL,
  PORT
}