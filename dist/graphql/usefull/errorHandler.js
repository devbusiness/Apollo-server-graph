"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _default = {
  serverError: function serverError(code, message) {
    return new _apolloServerExpress.ApolloError(message || "Internal Server Error", code || "500");
  },
  userInputError: function userInputError(validate) {
    return new _apolloServerExpress.UserInputError("This data isn't match to watch more scroll down  to invalidArgs", {
      invalidArgs: validate
    });
  },
  authenticationError: function authenticationError() {
    return new _apolloServerExpress.AuthenticationError("your credentials isn't correct..!");
  },
  forbiddenError: function forbiddenError() {
    return new _apolloServerExpress.ForbiddenError("this route is proctected..!");
  }
};
exports["default"] = _default;