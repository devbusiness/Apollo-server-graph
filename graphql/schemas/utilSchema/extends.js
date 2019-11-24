import gql from "graphql-tag";
export default gql`
  type Query
  type Mutation
  type Subscription

  enum Roles {
    User
    Admin
    Seller
    Client
  }
  type PageInfo {
    endCursor: Date!
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
    pages: Int!
    total: Int!
  }
`;
