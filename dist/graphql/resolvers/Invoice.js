"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _errorHandler = _interopRequireDefault(require("../usefull/errorHandler"));

var _middleware = require("./middleware");

var _graphqlResolvers = require("graphql-resolvers");

var _default = {
  Query: {
    getInvoice: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(parent, _ref, _ref2, info) {
        var id, models, invoice;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref.id;
                models = _ref2.models;
                _context.prev = 2;
                _context.next = 5;
                return models.Invoice.getInvoice(id);

              case 5:
                invoice = _context.sent;
                console.log(invoice);
                return _context.abrupt("return", invoice);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                console.log(_context.t0);
                return _context.abrupt("return", {
                  error: _context.t0
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }()),
    getInvoices: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref6 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(parent, _ref4, _ref5, info) {
        var limit, offset, models, _ref7, invoice, counted, error;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                limit = _ref4.limit, offset = _ref4.offset;
                models = _ref5.models;
                _context2.prev = 2;
                _context2.next = 5;
                return models.Invoice.getInvoices(limit, offset);

              case 5:
                _ref7 = _context2.sent;
                invoice = _ref7.invoice;
                counted = _ref7.counted;
                error = _ref7.error;

                if (!error) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", {
                  error: error
                });

              case 11:
                return _context2.abrupt("return", {
                  edges: invoice,
                  pageInfo: {
                    hasNextPage: limit < counted,
                    total: Math.ceil(invoice.length),
                    hasPreviousPage: offset > 0,
                    endCursor: invoice[invoice.length - 1].createdAt,
                    pages: Math.ceil(counted / invoice.length)
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
        return _ref6.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    // updateInvoice: combineResolvers(
    //   // isSeller,
    //   async (parent, { input }, { models, me }, info) => {
    //     try {
    //       const data = { ...input, id: null };
    //       return await models.Product.updateProduct(input.id, data);
    //     } catch (error) {
    //       console.log(error);
    //       return { error };
    //     }
    //   }
    // ),
    cancelInvoice: (0, _graphqlResolvers.combineResolvers)(_middleware.isSeller,
    /*#__PURE__*/
    function () {
      var _ref10 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(parent, _ref8, _ref9, info) {
        var id, models, me;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref8.id;
                models = _ref9.models, me = _ref9.me;
                _context3.prev = 2;
                _context3.next = 5;
                return models.Invoice.CancelInvoice(id);

              case 5:
                return _context3.abrupt("return", _context3.sent);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](2);
                console.log(_context3.t0);
                return _context3.abrupt("return", {
                  error: _context3.t0
                });

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 8]]);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref10.apply(this, arguments);
      };
    }()),
    createInvoice: (0, _graphqlResolvers.combineResolvers)(_middleware.isSeller,
    /*#__PURE__*/
    function () {
      var _ref13 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(parent, _ref11, _ref12, info) {
        var input, models, me, invoice;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref11.input;
                models = _ref12.models, me = _ref12.me;
                _context4.prev = 2;
                _context4.next = 5;
                return models.Invoice.createInvoice(input);

              case 5:
                invoice = _context4.sent;
                return _context4.abrupt("return", {
                  invoice: invoice
                });

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                console.log(_context4.t0);
                return _context4.abrupt("return", {
                  error: _context4.t0
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 9]]);
      }));

      return function (_x13, _x14, _x15, _x16) {
        return _ref13.apply(this, arguments);
      };
    }())
  },
  Subscription: {},
  Invoice: {
    seller: function () {
      var _seller2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(_ref14, args, _ref15) {
        var _seller, models;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _seller = _ref14.seller;
                models = _ref15.models;
                _context5.prev = 2;
                _context5.next = 5;
                return models.User.getUser(_seller);

              case 5:
                return _context5.abrupt("return", _context5.sent);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](2);
                console.log(_context5.t0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 8]]);
      }));

      function seller(_x17, _x18, _x19) {
        return _seller2.apply(this, arguments);
      }

      return seller;
    }(),
    customer: function () {
      var _customer2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(_ref16, args, _ref17) {
        var _customer, models;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _customer = _ref16.customer;
                models = _ref17.models;
                _context6.prev = 2;
                _context6.next = 5;
                return models.User.getUser(_customer);

              case 5:
                return _context6.abrupt("return", _context6.sent);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](2);
                console.log(_context6.t0);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 8]]);
      }));

      function customer(_x20, _x21, _x22) {
        return _customer2.apply(this, arguments);
      }

      return customer;
    }(),
    details: function () {
      var _details2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(_ref18, args, _ref19) {
        var _details, models, detailOfPurchase;

        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _details = _ref18.details;
                models = _ref19.models;
                detailOfPurchase = _details.map(
                /*#__PURE__*/
                function () {
                  var _ref20 = (0, _asyncToGenerator2["default"])(
                  /*#__PURE__*/
                  _regenerator["default"].mark(function _callee7(current) {
                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return models.Product.getProduct(current.product);

                          case 2:
                            _context7.t0 = _context7.sent.product;
                            _context7.t1 = current._id;
                            _context7.t2 = current.price;
                            _context7.t3 = current.stock;
                            _context7.t4 = current.subTotal;
                            return _context7.abrupt("return", {
                              product: _context7.t0,
                              _id: _context7.t1,
                              price: _context7.t2,
                              stock: _context7.t3,
                              subTotal: _context7.t4
                            });

                          case 8:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x26) {
                    return _ref20.apply(this, arguments);
                  };
                }());
                return _context8.abrupt("return", detailOfPurchase);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function details(_x23, _x24, _x25) {
        return _details2.apply(this, arguments);
      }

      return details;
    }()
  }
};
exports["default"] = _default;