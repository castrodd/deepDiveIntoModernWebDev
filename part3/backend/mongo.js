const mongoose = require('mongoose')

const password = encodeURIComponent(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]
const url = `mongodb+srv://modernwebmongodb:${password}@cluster0.tdqhuhf.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
    })
  })
}

if (process.argv.length === 5) {
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number,
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide the following: node mongo.js <password> <name> <number>')
  console.log('Or the following: node mongo.js <password>')
  process.exit(1)
}