"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("./user"));

var _resetPassword = _interopRequireDefault(require("./resetPassword"));

var _product = _interopRequireDefault(require("./product"));

var _interface = _interopRequireDefault(require("./utilSchema/interface"));

var _extends = _interopRequireDefault(require("./utilSchema/extends"));

var _scalarTypes = _interopRequireDefault(require("./utilSchema/scalarTypes"));

var _invoice = _interopRequireDefault(require("./invoice"));

var _default = [_user["default"], _resetPassword["default"], _invoice["default"], _product["default"], _extends["default"], _interface["default"], _scalarTypes["default"]];
exports["default"] = _default;