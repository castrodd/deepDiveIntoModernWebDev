const { gql } = require('apollo-server')

const typeDefs = gql`
  type Subscription {
    bookAdded: Book!
  }

  type User {
    username: String!
    genres: [String!]
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

module.exports = typeDefs
