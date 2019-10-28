import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import context from "./context";
const config = dotenv.config();

const app = express();
const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context
});

server.applyMiddleware({ app, path: "/graphql" });

mongoose
  .connect(process.env.MongoUriLocal, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() =>
    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀  Server ready at http://localhost:5000/graphql `);
    })
  )
  .catch(err => console.error(err));
