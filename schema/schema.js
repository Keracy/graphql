const graphql = require("graphql");
const _ = require("lodash");
const User = require("./models/users");
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
  GraphQLBoolean,
} = graphql;

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    userId: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    avatar: { type: GraphQLString },
    specialities: { type: GraphQLList(GraphQLString) },
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
    _id: { type: GraphQLID },
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
const DeleteTicketType = new GraphQLObjectType({
  name: "DeleteTicket",
  fields: () => ({
    status: { type: GraphQLString },
  }),
});
const LoginType = new GraphQLObjectType({
  name: "Login",
  fields: () => ({
    jwt: { type: GraphQLString },
  }),
});
const LoginCheckType = new GraphQLObjectType({
  name: "LoginCheck",
  fields: () => ({
    logged: { type: GraphQLBoolean },
  }),
});
const RegisterUserType = new GraphQLObjectType({
  name: "RegisterUser",
  fields: () => ({
    username: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
const MutationStatusType = new GraphQLObjectType({
  name: "MutationStatus",
  fields: () => ({
    status: {type: GraphQLString},
  }),
})
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tickets: {
      type: GraphQLList(TicketType),
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
        console.log(user);
        if (!user[0]) {
          return { jwt: null };
        }
        if (await bcrypt.compare(args.password, user[0].password))
          return {
            jwt: jwt.sign({ _id: user._id }, "react", { expiresIn: "15m" }),
          };
        return { jwt: null };
      },
    },
    checkAuth: {
      type: LoginCheckType,
      args: { token: { type: GraphQLString } },
      resolve(parent, args) {
        console.log(jwt.verify(args.token, "react"));
        return { logged: !!jwt.verify(args.token, "react") };
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: RegisterUserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          args.password.toLowerCase(),
          salt
        );
        const newUser = new User({
          username: args.username.toLowerCase(),
          password: hashedPassword,
          email: args.email,
          phone: args.phone,
        });
        await newUser.save();
        return newUser;
      },
    },
    deleteTicket: {
      type: DeleteTicketType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        console.log(args.id);
        await Ticket.findByIdAndDelete(args.id);
        return 200;
      },
    },
    editStatus: {
      type: MutationStatusType,
      args: { id: {type: GraphQLString }, status: { type: GraphQLString } },
      async resolve(parent, args){
        let status;
        if(args.status === "ASD") status = "assigned";
        if(args.status === "COM") status = "completed";
        if(args.status === "UNA") status = "unassigned";
        console.log(status);
        await Ticket.findByIdAndUpdate(args.id, {status: status} );
        return {status: "Done"};
      },
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
