import { gql } from "apollo-server-express";
export default gql`
  #Query#

  type Query {
    getUsers: [User]!
    getUser(id: ID!): User
  }

  #Muation#

  type Mutation {
    createUser(input: createUserInput!): userCreatedPayload!
    updateUser(input: updateUserInput!): User
    signin(input: signinInput): userCreatedPayload!
    SendEmailToRecoverPassword(email: String!): TokenPasswordReset!
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

  type TokenPasswordReset implements Node {
    _id: ID!
    user: ID
    times: Int
    description: String
    token: String
    createdAt: DateTime
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
