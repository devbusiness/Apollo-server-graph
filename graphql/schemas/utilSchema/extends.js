import gql from "graphql-tag";
export default gql`
  type Query
  type Mutation

  enum Roles {
    User
    Admin
    Other
  }
`;
