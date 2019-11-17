import { gql } from "apollo-server-express";
export default gql`
  #Query#

  extend type Query {
    getUsers: [User]!
    getUser(id: ID!): User
    getMe: User
  }

  #Muation#

  extend type Mutation {
    createUser(input: createUserInput!): userCreatedPayload!
    updateUser(input: updateUserInput!): User
    signin(input: signinInput): userCreatedPayload!
    SendEmailToRecoverPassword(email: String!): TokenPasswordReset!
    recoverPassword(input: RecoverPasswordInput!): userCreatedPayload!
  }
  #types#

  type User implements Node {
    _id: ID!
    name: String
    last_name: String
    username: String
    password: String
    email: String!
    createdAt: DateTime
    resetPassword: TokenPasswordReset
    updatedAt: DateTime
  }

  type userCreatedPayload {
    user: User
    token: String
  }

  # inputs #

  input createUserInput {
    name: String!
    last_name: String
    username: String!
    password: String!
    email: String!
    confirmPassword: String!
  }

  input RecoverPasswordInput {
    token: String!
    newPassword: String!
    password: String!
  }

  input signinInput {
    username: String!
    password: String!
  }
  input updateUserInput {
    id: ID!
    name: String
    last_name: String
    username: String
    # password: String
    # confirmPassword: String
  }
`;
