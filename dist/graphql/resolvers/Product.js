"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errorHandler = _interopRequireDefault(require("../usefull/errorHandler"));

var _middleware = require("./middleware");

var _graphqlResolvers = require("graphql-resolvers");

var _ramda = require("ramda");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Query: {
    getProduct: function () {
      var _getProduct = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var where, models, me;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                where = _ref.where;
                models = _ref2.models, me = _ref2.me;
                _context.prev = 2;
                _context.next = 5;
                return models.Product.getProduct(where);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", {
                  error: _context.t0
                });

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      function getProduct(_x, _x2, _x3, _x4) {
        return _getProduct.apply(this, arguments);
      }

      return getProduct;
    }(),
    getProducts: (0, _graphqlResolvers.combineResolvers)(_middleware.isValidData,
    /*#__PURE__*/
    function () {
      var _ref5 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref3, _ref4, info) {
        var input, models, _ref6, products, counted, error;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                input = _ref3.input;
                models = _ref4.models;
                _context2.prev = 2;
                _context2.next = 5;
                return models.Product.getProducts(input.limit, input.offset);

              case 5:
                _ref6 = _context2.sent;
                products = _ref6.products;
                counted = _ref6.counted;
                error = _ref6.error;

                if (!error) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", {
                  error: error
                });

              case 11:
                return _context2.abrupt("return", {
                  edges: products,
                  pageInfo: {
                    hasNextPage: input.limit < counted,
                    total: Math.ceil(products.length),
                    hasPreviousPage: input.offset > 0,
                    endCursor: products[products.length - 1].createdAt,
                    pages: Math.ceil(counted / products.length)
                  }
                });

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](2);
                console.log(_context2.t0);
                return _context2.abrupt("return", _errorHandler["default"].serverError());

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 14]]);
      }));

      return function (_x5, _x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    updateProduct: (0, _graphqlResolvers.combineResolvers)(_middleware.isSeller,
    /*#__PURE__*/
    function () {
      var _ref9 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref7, _ref8, info) {
        var input, models, me, data;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                input = _ref7.input;
                models = _ref8.models, me = _ref8.me;
                _context3.prev = 2;
                data = _objectSpread({}, input, {
                  id: null
                });
                _context3.next = 6;
                return models.Product.updateProduct(input.id, data);

              case 6:
                return _context3.abrupt("return", _context3.sent);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);
                return _context3.abrupt("return", {
                  error: _context3.t0
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref9.apply(this, arguments);
      };
    }()),
    deleteProduct: (0, _graphqlResolvers.combineResolvers)(_middleware.isSeller,
    /*#__PURE__*/
    function () {
      var _ref12 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref10, _ref11, info) {
        var id, models, me;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref10.id;
                models = _ref11.models, me = _ref11.me;
                _context4.prev = 2;
                _context4.next = 5;
                return models.Product.deleteProduct(id);

              case 5:
                return _context4.abrupt("return", _context4.sent);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](2);
                console.log(_context4.t0);
                return _context4.abrupt("return", {
                  error: _context4.t0
                });

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 8]]);
      }));

      return function (_x13, _x14, _x15, _x16) {
        return _ref12.apply(this, arguments);
      };
    }()),
    createProduct: (0, _graphqlResolvers.combineResolvers)(_middleware.isSeller,
    /*#__PURE__*/
    function () {
      var _ref15 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(parent, _ref13, _ref14, info) {
        var input, models, me;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                input = _ref13.input;
                models = _ref14.models, me = _ref14.me;
                _context5.prev = 2;
                _context5.next = 5;
                return models.Product.createProduct(input);

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                console.log(_context5.t0);
                return _context5.abrupt("return", {
                  error: _context5.t0
                });

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 8]]);
      }));

      return function (_x17, _x18, _x19, _x20) {
        return _ref15.apply(this, arguments);
      };
    }())
  },
  Subscription: {}
};
exports["default"] = _default;