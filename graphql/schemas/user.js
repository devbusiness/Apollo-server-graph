import gql from "graphql-tag";
export default gql`
  #Query#

  extend type Query {
    getUsers(cursor: String, limit: Int): UserConnection!
    getUser(id: ID!): User
    getMe: User
  }

  #Muation#

  extend type Mutation {
    createUser(input: createUserInput!): userCreatedPayload!
    updateMe(input: updateMeInput!): User
    DeleteMe: DeleteMePayload!
    updateUser(input: updateUserInput!): User
    signin(input: signinInput): userCreatedPayload!
    SendEmailToRecoverPassword(email: String!): TokenPasswordReset!
    recoverPassword(input: RecoverPasswordInput!): userCreatedPayload!
    updatePassword(input: UpdatePasswordInput!): userCreatedPayload!
  }
  #Subscription
  extend type Subscription {
    newUser: userCreatedPayload!
    updatedUser(user_id: ID!): User!
  }
  # types#

  type User implements Node {
    _id: ID!
    name: String
    last_name: String
    username: String
    password: String
    email: String!
    createdAt: DateTime
    roles: [String]
    resetPassword: TokenPasswordReset
    updatedAt: DateTime
  }

  type userCreatedPayload {
    user: User
    token: String
  }

  type UserConnection {
    edges: [User!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: Date!
    hasNextPage: Boolean!
    total: Int!
  }
  type DeleteMePayload {
    disabled: Boolean
    message: String
    error: String
  }
  # inputs #

  input createUserInput {
    name: String!
    last_name: String
    username: String!
    password: String!
    email: String!
    roles: [Roles!]!
    confirmPassword: String!
  }

  input RecoverPasswordInput {
    token: String!
    newPassword: String!
    password: String!
  }
  input UpdatePasswordInput {
    current: String!
    password: String!
    passwordConfirm: String!
  }

  input signinInput {
    username: String!
    password: String!
  }
  input updateMeInput {
    name: String
    last_name: String
    username: String
  }
  input updateUserInput {
    user_id: ID!
    name: String
    last_name: String
    username: String
  }
`;
