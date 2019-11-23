import gql from "graphql-tag";

export default gql`
  extend type Query {
    getProduct(input: getProductWhere!): ProductPayload!
    getProducts: ProductsPayload!
  }
  extend type Mutation {
    createProduct(input: CreateProductInput!): ProductPayload!
    deleteProduct(id: ID!): ProductPayload!
    updateProduct(input: UpdateProductInput!): ProductPayload
  }

  type Product {
    name: String
    ref: String
    price: Float
    stock: Int
    iva: Int
  }
  input getProductWhere {
    id: ID
    ref: String
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
  input UpdateProductInput {
    id: ID!
    name: String!
    ref: String!
    price: Int!
    stock: Int!
    iva: Int!
  }
`;
