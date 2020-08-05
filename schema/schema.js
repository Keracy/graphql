const graphql = require("graphql");
const _ = require("lodash");
const User = require("./models/users");
const Author = require("./models/authors");
const Book = require("./models/book");
const { Ticket } = require("./models/ticket");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    userId: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    avatar: { type: GraphQLString },
    specialities: { type: new GraphQLList(GraphQLString) },
  }),
});
const AssetType = new GraphQLObjectType({
  name: "Asset",
  fields: () => ({
    assetId: { type: GraphQLInt },
    name: { type: GraphQLString },
    geoCode: { type: GraphQLString },
    kmFrom: { type: GraphQLFloat },
    kmTo: { type: GraphQLFloat },
  }),
});
const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    ticketId: { type: GraphQLInt },
    number: { type: GraphQLString },
    lastUpdatedTime: { type: GraphQLString },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return parent.owner;
      },
    },
    reportedTime: { type: GraphQLString },
    status: { type: GraphQLString },
    description: { type: GraphQLString },
    asset: { type: AssetType },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});
const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    jwt: { type: GraphQLString },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(parent.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.find({});
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      },
    },
    tickets: {
      type: new GraphQLList(TicketType),
      async resolve(parent, args) {
        return await Ticket.find({});
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLInt } },
      async resolve(parent, args) {
        const ticket = await Ticket.find({ ticketId: args.id });
        return ticket[0];
      },
    },
    login: {
      type: LoginType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.find({ username: args.username });
        if (await bcrypt.compare(args.password, user[0].password))
          return { jwt: jwt.sign({ _id: user._id }, "react") };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
