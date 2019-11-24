"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _productController = _interopRequireDefault(require("../products/productController"));

var _errorController = _interopRequireDefault(require("../errorController"));

var _invoiceModel = _interopRequireDefault(require("./invoiceModel"));

var _default = {
  createInvoice: function () {
    var _createInvoice = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(data) {
      var invoice, productMap;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _invoiceModel["default"].create(data);

            case 3:
              invoice = _context2.sent;
              productMap = invoice.details;
              productMap.map(
              /*#__PURE__*/
              function () {
                var _ref = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee(sub) {
                  var prod, newValue;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _productController["default"].getProduct({
                            _id: sub.product
                          });

                        case 2:
                          prod = _context.sent;
                          newValue = prod.product.stock - sub.stock;
                          _context.next = 6;
                          return _productController["default"].updateProduct(sub.product, {
                            stock: newValue
                          });

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }());
              return _context2.abrupt("return", invoice);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log({
                error: _context2.t0
              });
              return _context2.abrupt("return", {
                error: (0, _errorController["default"])(_context2.t0)
              });

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    function createInvoice(_x) {
      return _createInvoice.apply(this, arguments);
    }

    return createInvoice;
  }(),
  // updateInvoice: async (id, data) => {
  //   try {
  //     const invoice = await Invoice.findByIdAndUpdate(id, { details: data });
  //     return { Invoice };
  //   } catch (error) {
  //     return { error };
  //   }
  // },
  CancelInvoice: function () {
    var _CancelInvoice = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(id) {
      var invoice;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _invoiceModel["default"].findByIdAndRemove(id, {
                status: "Canceled"
              });

            case 3:
              invoice = _context4.sent;
              invoice.details.map(
              /*#__PURE__*/
              function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee3(sub) {
                  var prod, newValue;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _productController["default"].getProduct({
                            _id: sub.product
                          });

                        case 2:
                          prod = _context3.sent;
                          newValue = prod.product.stock + sub.stock;
                          _context3.next = 6;
                          return _productController["default"].updateProduct(sub.product, {
                            stock: newValue
                          });

                        case 6:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
              return _context4.abrupt("return", {
                invoice: invoice
              });

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", {
                error: _context4.t0
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));

    function CancelInvoice(_x3) {
      return _CancelInvoice.apply(this, arguments);
    }

    return CancelInvoice;
  }(),
  getInvoice: function () {
    var _getInvoice = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(id) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _invoiceModel["default"].findById(id);

            case 3:
              _context5.t0 = _context5.sent;
              return _context5.abrupt("return", {
                invoice: _context5.t0
              });

            case 7:
              _context5.prev = 7;
              _context5.t1 = _context5["catch"](0);
              console.log(_context5.t1);
              return _context5.abrupt("return", {
                error: (0, _errorController["default"])(_context5.t1)
              });

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    function getInvoice(_x5) {
      return _getInvoice.apply(this, arguments);
    }

    return getInvoice;
  }(),
  getInvoices: function () {
    var _getInvoices = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(limit, offset) {
      var counted, invoice;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _invoiceModel["default"].countDocuments();

            case 3:
              counted = _context6.sent;
              _context6.next = 6;
              return _invoiceModel["default"].find().skip(offset).limit(limit).lean();

            case 6:
              invoice = _context6.sent;
              return _context6.abrupt("return", {
                invoice: invoice,
                counted: counted
              });

            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              return _context6.abrupt("return", {
                error: (0, _errorController["default"])(_context6.t0)
              });

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 10]]);
    }));

    function getInvoices(_x6, _x7) {
      return _getInvoices.apply(this, arguments);
    }

    return getInvoices;
  }()
};
exports["default"] = _default;