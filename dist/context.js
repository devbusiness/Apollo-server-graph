"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _controller = _interopRequireDefault(require("./graphql/controller"));

var _graphqlSubscriptions = require("graphql-subscriptions");

var _apolloServerExpress = require("apollo-server-express");

var pubSub = new _graphqlSubscriptions.PubSub();

var getMe =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers["authorization"] ? req.headers["authorization"].replace(/JWT|Bearer/i, "").trim() : null;

            if (!token) {
              _context.next = 11;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);

          case 5:
            return _context.abrupt("return", _context.sent);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            throw new _apolloServerExpress.AuthenticationError("Your Session has expired, Sign in Again..!");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));

  return function getMe(_x) {
    return _ref.apply(this, arguments);
  };
}();

var context =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref2) {
    var req, connection, me;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref2.req, connection = _ref2.connection;

            if (!connection) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", {
              models: _controller["default"],
              pubSub: pubSub
            });

          case 3:
            if (!req) {
              _context2.next = 8;
              break;
            }

            _context2.next = 6;
            return getMe(req);

          case 6:
            me = _context2.sent;
            return _context2.abrupt("return", {
              models: _controller["default"],
              me: me,
              pubSub: pubSub,
              secret: process.env.JWT_SECRET
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function context(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = context;
exports["default"] = _default;