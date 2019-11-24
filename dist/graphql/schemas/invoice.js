"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Query {\n    getInvoices(limit: Int, offset: Int): InvoiceConnection!\n    getInvoice(id: ID!): InvoiceCreatedPayload!\n  }\n  extend type Mutation {\n    createInvoice(input: CreateInvoiceInput!): InvoiceCreatedPayload!\n    cancelInvoice(id: ID!): InvoiceCreatedPayload!\n    ## updateInvoice(input: UpdateInvoiceInput!): InvoicetPayload\n  }\n\n  type Invoice implements Node {\n    _id: ID\n    createdAt: DateTime\n    updatedAt: DateTime\n    seller: User\n    customer: User\n    total: Float!\n    details: [DetailInvoice]!\n    status: String\n  }\n  type InvoiceConnection implements Connection {\n    edges: [Invoice!]\n    pageInfo: PageInfo\n    error: String\n  }\n  enum Status {\n    Active\n    Canceled\n    Sold\n  }\n  type DetailInvoice {\n    _id: ID!\n    product: Product\n    price: Float\n    subTotal: Float\n    stock: Int\n  }\n  type InvoiceCreatedPayload {\n    invoice: Invoice\n    error: String\n  }\n  type InvoicesPayload {\n    invoice: [Invoice!]\n    error: String\n  }\n  input CreateInvoiceInput {\n    total: Float!\n    details: [DetailInvoiceInpt]!\n    seller: ID!\n    status: Status\n    customer: ID!\n  }\n\n  input DetailInvoiceInpt {\n    product: ID!\n    price: Float!\n    subTotal: Float!\n    stock: Int!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _graphqlTag["default"])(_templateObject());

exports["default"] = _default;