import gql from "graphql-tag";
export default gql`
  #Query#

  extend type Query {
    getResetPasswordBeforeChange(
      token: String!
    ): getResetPasswordBeforeChangePayload!
  }

  #Muation#

  # extend type Mutation {

  # }
  #types#

  type TokenPasswordReset implements Node {
    _id: ID!
    user: ID
    times: Int
    description: String
    token: String
    createdAt: DateTime
    updatedAt: DateTime
  }
  type getResetPasswordBeforeChangePayload {
    user_id: ID
    valid: Boolean!
    token: String
    message: String
  }
`;
