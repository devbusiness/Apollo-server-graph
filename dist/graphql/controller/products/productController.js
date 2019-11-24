"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _productsModel = _interopRequireDefault(require("./productsModel"));

var _errorController = _interopRequireDefault(require("../errorController"));

var _default = {
  createProduct: function () {
    var _createProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(data) {
      var product;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _productsModel["default"].create(data);

            case 3:
              product = _context.sent;
              return _context.abrupt("return", {
                product: product
              });

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log({
                error: _context.t0
              });
              return _context.abrupt("return", {
                error: (0, _errorController["default"])(_context.t0)
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function createProduct(_x) {
      return _createProduct.apply(this, arguments);
    }

    return createProduct;
  }(),
  updateProduct: function () {
    var _updateProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(id, data) {
      var product;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _productsModel["default"].findByIdAndUpdate(id, data);

            case 3:
              product = _context2.sent;
              return _context2.abrupt("return", {
                product: product
              });

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: _context2.t0
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function updateProduct(_x2, _x3) {
      return _updateProduct.apply(this, arguments);
    }

    return updateProduct;
  }(),
  deleteProduct: function () {
    var _deleteProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(id) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _productsModel["default"].findByIdAndRemove(id);

            case 3:
              _context3.t0 = _context3.sent;
              return _context3.abrupt("return", {
                product: _context3.t0
              });

            case 7:
              _context3.prev = 7;
              _context3.t1 = _context3["catch"](0);
              console.log(_context3.t1);
              return _context3.abrupt("return", {
                error: _context3.t1
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function deleteProduct(_x4) {
      return _deleteProduct.apply(this, arguments);
    }

    return deleteProduct;
  }(),
  getProduct: function () {
    var _getProduct = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(id) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _productsModel["default"].findOne({
                _id: id
              });

            case 3:
              _context4.t0 = _context4.sent;
              return _context4.abrupt("return", {
                product: _context4.t0
              });

            case 7:
              _context4.prev = 7;
              _context4.t1 = _context4["catch"](0);
              console.log(_context4.t1);
              return _context4.abrupt("return", {
                error: _context4.t1
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function getProduct(_x5) {
      return _getProduct.apply(this, arguments);
    }

    return getProduct;
  }(),
  getProducts: function () {
    var _getProducts = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(limit, offset) {
      var counted, products;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _productsModel["default"].countDocuments();

            case 3:
              counted = _context5.sent;
              _context5.next = 6;
              return _productsModel["default"].find().skip(offset).limit(limit);

            case 6:
              products = _context5.sent;
              return _context5.abrupt("return", {
                products: products,
                counted: counted
              });

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              return _context5.abrupt("return", {
                error: (0, _errorController["default"])(_context5.t0)
              });

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 10]]);
    }));

    function getProducts(_x6, _x7) {
      return _getProducts.apply(this, arguments);
    }

    return getProducts;
  }()
};
exports["default"] = _default;