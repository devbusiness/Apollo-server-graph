"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userController = _interopRequireDefault(require("./user/userController"));

var _passwordResetController = _interopRequireDefault(require("./password-reset/passwordResetController"));

var _invoiceController = _interopRequireDefault(require("./invoice/invoiceController"));

var _productController = _interopRequireDefault(require("./products/productController"));

var _default = {
  User: _userController["default"],
  Reset: _passwordResetController["default"],
  Product: _productController["default"],
  Invoice: _invoiceController["default"]
};
exports["default"] = _default;