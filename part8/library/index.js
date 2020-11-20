const DataLoader = require('dataloader')
const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
mongoose.set('debug', true)

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
require('dotenv').config()

const pubsub = new PubSub()

console.log('Connecting to ', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.log('Error connecting to DB: ', error.message)
})

const jwt = require('jsonwebtoken')
const book = require('./models/book')

const JWT_SECRET = 'todo_when_have_time'

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favoriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args, context) => {
      if (!args.author && !args.genre) {
        return await Book.find({}).populate('author')
      } else if (args.genre && args.author) {
        const author = await Author.find({ name: args.author }, '_id')
        return await Book.find({ genres: { $in: args.genre }, author: author }).populate('author')
      } else if (args.author) {
        const author = await Author.find({ name: args.author }, '_id')
        return await Book.find({ author: author }).populate('author')
      } else if (args.genre) {
        return await Book.find({ genres: { $in: args.genre } }).populate('author')
      } else if (context.currentUser) {
        const genre = context.currentUser.favoriteGenre
        console.log(genre)
        return await Book.find({ genres: { $in: context.currentUser.favoriteGenre } }).populate('author')
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root, args, context) => {
      const results = await context.bookLoader.load(root._id)
      return results
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      if (!author) {
        try {
          const authorToSave = new Author({ name: args.author })
          await authorToSave.save()
          author = authorToSave
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { returnNewDocument: true })

      return author
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwd = 'hunter2'
      if (!user || args.password !== passwd) {
        throw new UserInputError(`password did not match ${passwd}, try again!`)
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    let currentUser = null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      currentUser = await (await User.findById(decodedToken.id))
    }
    return {
      currentUser: currentUser,
      bookLoader: new DataLoader(async keys => {
        const books = await Book.find({ author: { $in: keys } }).select('author')
        const authorsMap = {}
        keys.forEach(author => {
          authorsMap[author] = books.filter(b => JSON.stringify(b.author) === JSON.stringify(author)).length
        })
        return keys.map(key => authorsMap[key])
      })
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})