import { gql } from "apollo-server-express";

export default gql`
  #Query#

  type Query {
    getUsers: [User]!
    getUser(id: ID): User
  }

  #Muation#

  type Mutation {
    createUser(input: createUserInput!): userCreatedPayload!
    updateUser(input: updateUserInput!): User
    signin(input: signinInput): userCreatedPayload
  }
  #types#

  type User implements Node {
    id: ID!
    name: String
    last_name: String
    username: String
    password: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type userCreatedPayload {
    user: User!
    token: String!
  }
  # inputs #

  input createUserInput {
    name: String!
    last_name: String
    username: String!
    password: String!
    confirmPassword: String!
  }
  input signinInput {
    username: String!
    password: String!
  }
  input updateUserInput {
    id: ID!
    name: String!
    last_name: String
    username: String
    password: String
    confirmPassword: String
  }
`;
