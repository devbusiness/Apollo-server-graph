import { gql } from "apollo-server-express";

export default gql`
  interface Node {
    _id: ID
    createdAt: DateTime
    updatedAt: DateTime
  }
  interface Connection {
    pageInfo: PageInfo
  }
`;
