require('dotenv').config()

const PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)
const PORT = process.env.PORT

module.exports = {
  PASSWORD,
  PORT
}