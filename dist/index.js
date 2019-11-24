"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _apolloServerExpress = require("apollo-server-express");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _schemas = _interopRequireDefault(require("./graphql/schemas"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _context = _interopRequireDefault(require("./context"));

var _http = require("http");

var _cors = _interopRequireDefault(require("cors"));

// import { onError } from "apollo-link-error";
var config = _dotenv["default"].config();

var app = (0, _express["default"])();
var server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schemas["default"],
  resolvers: _resolvers["default"],
  context: _context["default"],
  playground: {
    settings: {
      "editor.cursorShape": "line",
      "editor.theme": "light",
      "editor.fontFamily": "Victor-Mono"
    }
  },
  subscriptions: {
    onConnect: function onConnect(connetionParams, webSocket, context) {},
    onDisconnect: function onDisconnect(webSocket, context) {},
    path: "/subscriptions",
    keepAlive: 10 * (60 * 3600)
  },
  introspection: true,
  tracing: true
}); // app.use(cors());

app.set("view engine", "pug"); // server.applyMiddleware({ app, path: "/graphql" });

server.applyMiddleware({
  app: app
});
var serv = (0, _http.createServer)(app);
server.installSubscriptionHandlers(serv);
var uriDB = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev" ? process.env.MongoUriLocal : process.env.MongoUriCluster;

_mongoose["default"].connect(uriDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  serv.listen(process.env.PORT, function () {
    console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(process.env.PORT).concat(server.graphqlPath));
    console.log("\uD83D\uDE80 Subscriptions ready at ws://localhost:".concat(process.env.PORT).concat(server.subscriptionsPath));
  });
})["catch"](function (err) {
  return console.error(err);
});