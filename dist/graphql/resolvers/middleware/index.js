"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidData = exports.isSeller = exports.onlyAdmin = exports.isAuthenticated = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServer = require("apollo-server");

var _graphqlResolvers = require("graphql-resolvers");

var isAuthenticated = function isAuthenticated(parent, args, _ref) {
  var me = _ref.me;
  return me ? _graphqlResolvers.skip : new _apolloServer.ForbiddenError("Not authenticated as user..!");
};

exports.isAuthenticated = isAuthenticated;
var onlyAdmin = (0, _graphqlResolvers.combineResolvers)(isAuthenticated,
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(parent, _ref2, _ref3) {
    var input, models, me;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _ref2.input;
            models = _ref3.models, me = _ref3.me;
            return _context.abrupt("return", me.roles.includes("Admin") ? _graphqlResolvers.skip : new _apolloServer.ForbiddenError("Not Authorized for this action..!"));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}());
exports.onlyAdmin = onlyAdmin;
var isSeller = (0, _graphqlResolvers.combineResolvers)(isAuthenticated,
/*#__PURE__*/
function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(parent, _ref5, _ref6) {
    var input, models, me;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref5.input;
            models = _ref6.models, me = _ref6.me;
            return _context2.abrupt("return", me.roles.includes("Seller") || me.roles.includes("Admin") ? _graphqlResolvers.skip : new _apolloServer.ForbiddenError("Not Authorized for this action..!"));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}());
exports.isSeller = isSeller;
var isValidData = (0, _graphqlResolvers.combineResolvers)(
/*#__PURE__*/
function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(parent, _ref8, _ref9) {
    var input, models, me;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            input = _ref8.input;
            models = _ref9.models, me = _ref9.me;
            input.limit <= 0 && input.offset <= 0 ? new _apolloServer.UserInputError("la data proporcionada debe ser valida") : _graphqlResolvers.skip;

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref10.apply(this, arguments);
  };
}());
exports.isValidData = isValidData;