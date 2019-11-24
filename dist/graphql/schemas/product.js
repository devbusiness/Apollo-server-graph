"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  extend type Query {\n    getProduct(input: getProductWhere!): ProductPayload!\n    getProducts(input: paginateProduct!): ProductConnection!\n  }\n  extend type Mutation {\n    createProduct(input: CreateProductInput!): ProductPayload!\n    deleteProduct(id: ID!): ProductPayload!\n    updateProduct(input: UpdateProductInput!): ProductPayload\n  }\n\n  type Product implements Node {\n    name: String\n    ref: String\n    price: Float\n    stock: Int\n    iva: Int\n    _id: ID!\n    createdAt: DateTime!\n    updatedAt: DateTime!\n  }\n  input getProductWhere {\n    id: ID\n    ref: String\n  }\n\n  type ProductConnection implements Connection {\n    edges: [Product!]\n    pageInfo: PageInfo\n    error: String\n  }\n\n  type ProductPayload {\n    product: Product\n    error: String\n  }\n  type ProductsPayload {\n    product: [Product!]\n    error: String\n  }\n  input CreateProductInput {\n    name: String!\n    ref: String!\n    price: Int!\n    stock: Int!\n    iva: Int!\n  }\n  input paginateProduct {\n    limit: Int\n    offset: Int\n  }\n  input UpdateProductInput {\n    id: ID!\n    name: String\n    ref: String\n    price: Int\n    stock: Int\n    iva: Int\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _graphqlTag["default"])(_templateObject());

exports["default"] = _default;