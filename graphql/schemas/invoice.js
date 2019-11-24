import gql from "graphql-tag";

export default gql`
  extend type Query {
    getInvoices(limit: Int, offset: Int): InvoiceConnection!
    getInvoice(id: ID!): InvoiceCreatedPayload!
  }
  extend type Mutation {
    createInvoice(input: CreateInvoiceInput!): InvoiceCreatedPayload!
    cancelInvoice(id: ID!): InvoiceCreatedPayload!
    ## updateInvoice(input: UpdateInvoiceInput!): InvoicetPayload
  }

  type Invoice implements Node {
    _id: ID
    createdAt: DateTime
    updatedAt: DateTime
    seller: User
    customer: User
    total: Float!
    details: [DetailInvoice]!
    status: String
  }
  type InvoiceConnection implements Connection {
    edges: [Invoice!]
    pageInfo: PageInfo
    error: String
  }
  type DetailInvoice {
    _id: ID!
    product: Product
    price: Float
    subTotal: Float
    stock: Int
  }
  type InvoiceCreatedPayload {
    invoice: Invoice
    error: String
  }
  type InvoicesPayload {
    invoice: [Invoice!]
    error: String
  }
  input CreateInvoiceInput {
    total: Float!
    details: [DetailInvoiceInpt]!
    seller: ID!
    customer: ID!
  }

  input DetailInvoiceInpt {
    product: ID!
    price: Float!
    subTotal: Float!
    stock: Int!
  }
`;
