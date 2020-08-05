const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://Keracy:keracy@rest.xa9or.mongodb.net/Rest?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.use(
  "/graphql",
  graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Server is running");
});
