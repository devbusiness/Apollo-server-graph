import { ApolloError, UserInputError } from "apollo-server-express";
export default {
  serverError: (code, message) =>
    new ApolloError(message || "Internal Server Error", code || "500"),
  userInputError: validate =>
    new UserInputError("you don't have sendt the correct data", {
      invalidArgs: validate
    })
};
