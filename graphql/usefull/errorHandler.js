import {
  ApolloError,
  UserInputError,
  AuthenticationError
} from "apollo-server-express";
export default {
  serverError: (code, message) =>
    new ApolloError(message || "Internal Server Error", code || "500"),
  userInputError: validate =>
    new UserInputError(
      "This data isn't match to watch more scroll down  to invalidArgs",
      {
        invalidArgs: validate
      }
    ),
  authenticationError: () => new authenticationError()
};
