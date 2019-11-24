"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  #Query#\n\n  extend type Query {\n    getResetPasswordBeforeChange(\n      token: String!\n    ): getResetPasswordBeforeChangePayload!\n  }\n\n  #Muation#\n\n  # extend type Mutation {\n\n  # }\n  #types#\n\n  type TokenPasswordReset implements Node {\n    _id: ID!\n    user: ID\n    times: Int\n    description: String\n    token: String\n    createdAt: DateTime\n    updatedAt: DateTime\n  }\n  type getResetPasswordBeforeChangePayload {\n    user_id: ID\n    valid: Boolean!\n    token: String\n    message: String\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _default = (0, _graphqlTag["default"])(_templateObject());

exports["default"] = _default;