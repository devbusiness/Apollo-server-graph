import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import schemas from "./graphql/schemas";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import context from "./context";
// import { onError } from "apollo-link-error";
import { createServer } from "http";

const config = dotenv.config();
import cors from "cors";
const app = express();
const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context,
  playground: {
    settings: {
      "editor.cursorShape": "line",
      "editor.theme": "light",
      "editor.fontFamily": "Victor-Mono"
    }
  },
  subscriptions: {
    onConnect: (connetionParams, webSocket, context) => {},
    onDisconnect: (webSocket, context) => {},
    path: "/subscriptions",
    keepAlive: 10 * (60 * 3600)
  },
  introspection: true,
  tracing: true
});

// app.use(cors());
app.set("view engine", "pug");
// server.applyMiddleware({ app, path: "/graphql" });

server.applyMiddleware({ app });

const serv = createServer(app);
server.installSubscriptionHandlers(serv);
mongoose
  .connect(process.env.MongoUriLocal, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    serv.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
      );
    });
  })
  .catch(err => console.error(err));
