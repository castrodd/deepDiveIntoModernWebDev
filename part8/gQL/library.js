const { ApolloServer, gql, UserInputError } = require("apollo-server")
const { PASSWORD } = require("./config")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const { v1: uuid } = require("uuid")

console.log(`connecting to database...`)
const MONGODB_URI = `mongodb+srv://modernwebmongodb:${PASSWORD}@cluster0.tdqhuhf.mongodb.net/library?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
  .then(() => console.log("connected to mongo"))
  .catch((error) => console.log("error connecting...", error.message))

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!,
    born: Int,
    id: String,
    bookCount: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors(name: String): [Author]!
  }

  type Mutation {
    addAuthor(
      name: String!,
      born: Int
    ): Author
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    addBook(
      title: String!,
      published: Int! 
      author: String!,
      genres: [String]!): Book!
  }
`
const _addAuthor = async (_, args) => {
  const author = new Author({ ...args })
  return author.save()
}

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, args) => {
      let results = await Book.find({}).populate('author')
      if (args.author) {
        results = results
          .filter(book => args.author === book.author.name)
      }
      if (args.genre) {
        results = results
          .filter(book => book.genres.includes(args.genre))
      }
      return results
    },
    allAuthors: async (_, args) => {
      let results = await Author.find({})
      let books = await Book.find({}).populate('author')
      
      if (args.name) {
        results = results
          .filter(author => author.name === args.name)
      }

      return results.map(author => {
        return {
          name: author.name,
          born: author.born,
          bookCount: books.reduce((prev, curr) => 
            curr.author.name == author.name ? prev + 1 : prev, 0
          )
        }
      })
        
    }
  },
    Mutation: {
      addAuthor: _addAuthor,
      editAuthor: async (_, args) => {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      },
      addBook: async (_, args) => {
        const book = new Book({ ...args })
        return book.save()
      }
    }
  }

const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
