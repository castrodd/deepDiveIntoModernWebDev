const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { PASSWORD } = require('./config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')

console.log(`connecting to database...`)
const MONGODB_URI = `mongodb+srv://modernwebmongodb:${PASSWORD}@cluster0.tdqhuhf.mongodb.net/library?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI)
  .then(() => console.log('connected to mongo'))
  .catch((error) => console.log('error connecting...', error.message))

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

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
      name: String!
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
    allBooks: (_, args) => {
      let results = [...books]
      if (args.author) {
        results = results
          .filter(book => args.author === book.author)
      }
      if (args.genre) {
        results = results
          .filter(book => book.genres.includes(args.genre))
      }
      return results
    },
    allAuthors: (_, args) => {
      let results = [...authors]
      if (args.name) {
        results = results
          .filter(author => author.name === args.name)
      }
      return results.map(author => {
        return {
          name: author.name,
          born: author.born,
          bookCount: books.reduce((prev, curr) => curr.author === author.name ? prev + 1 : prev, 0)
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
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          _addAuthor(null, { name: args.author })
        }

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
