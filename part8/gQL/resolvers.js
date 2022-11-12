const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { UserInputError } = require("apollo-server")
const Author = require("./models/author")
const Book = require("./models/book")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const JWT_SECRET = 'THIS_IS_MY_SECRET'

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
          ),
          id: author.id
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
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        book.author = author.id
        try {
          await book.save()          
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

module.exports = resolvers
