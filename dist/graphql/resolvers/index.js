"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlIsoDate = require("graphql-iso-date");

var _User = _interopRequireDefault(require("./User"));

var _ResetPassword = _interopRequireDefault(require("./ResetPassword"));

var _Product = _interopRequireDefault(require("./Product"));

var _Invoice = _interopRequireDefault(require("./Invoice"));

var customScalarResolver = {
  Date: _graphqlIsoDate.GraphQLDateTime
};
var _default = [_User["default"], _ResetPassword["default"], _Product["default"], _Invoice["default"], customScalarResolver];
exports["default"] = _default;