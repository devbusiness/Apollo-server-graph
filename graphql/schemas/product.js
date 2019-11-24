import gql from "graphql-tag";

export default gql`
  extend type Query {
    getProduct(input: getProductWhere!): ProductPayload!
    getProducts(input: paginateProduct!): ProductConnection!
  }
  extend type Mutation {
    createProduct(input: CreateProductInput!): ProductPayload!
    deleteProduct(id: ID!): ProductPayload!
    updateProduct(input: UpdateProductInput!): ProductPayload
  }

  type Product implements Node {
    name: String
    ref: String
    price: Float
    stock: Int
    iva: Int
    _id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  input getProductWhere {
    id: ID
    ref: String
  }

  type ProductConnection implements Connection {
    edges: [Product!]
    pageInfo: PageInfo
    error: String
  }

  type ProductPayload {
    product: Product
    error: String
  }
  type ProductsPayload {
    product: [Product!]
    error: String
  }
  input CreateProductInput {
    name: String!
    ref: String!
    price: Int!
    stock: Int!
    iva: Int!
  }
  input paginateProduct {
    limit: Int
    offset: Int
  }
  input UpdateProductInput {
    id: ID!
    name: String
    ref: String
    price: Int
    stock: Int
    iva: Int
  }
`;
