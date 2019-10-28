import { gql } from "apollo-server-express";

export default gql`
  interface Node {
    id: ID
    createdAt: DateTime
    updatedAt: DateTime
  }
`;
