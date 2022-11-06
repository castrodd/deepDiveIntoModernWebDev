const { ApolloServer, gql, UserInputError } = require("apollo-server")
const { PASSWORD } = require("./config")
const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'THIS_IS_MY_SECRET'

console.log(`connecting to database...`)
const MONGODB_URI = `mongodb+srv://modernwebmongodb:${PASSWORD}@cluster0.tdqhuhf.mongodb.net/library?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
  .then(() => console.log("connected to mongo"))
  .catch((error) => console.log("error connecting...", error.message))

const typeDefs = gql`
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
  }

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
    me: User
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
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`
const _addAuthor = async (_, args) => {
  const author = new Author({ ...args })
  try {
    await author.save()
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: args
    })
  }

  return author
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
    Mutation: {
      addAuthor: _addAuthor,
      editAuthor: async (_, args, context) => {
        if (!context.currentUser) {
          throw Error('Must have a valid token.')
        }
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        return author
      },
      addBook: async (_, args, context) => {
        if (!context.currentUser) {
          throw Error('Must have a valid token.')
        }
        const book = new Book({ ...args })
        try {
          await book.save()          
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        return book
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    }
  }

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        console.log("Decoding token...")
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
