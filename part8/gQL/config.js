require('dotenv').config()

const PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD)

module.exports = {
  PASSWORD
}
