import gql from "graphql-tag";
export default gql`
  type Query
  type Mutation
  type Subscription

  enum Roles {
    User
    Admin
    Other
  }
`;
