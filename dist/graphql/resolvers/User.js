"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ramda = require("ramda");

var _passwordResetController = _interopRequireDefault(require("../controller/password-reset/passwordResetController"));

var _errorHandler = _interopRequireDefault(require("../usefull/errorHandler"));

var _graphqlResolvers = require("graphql-resolvers");

var _middleware = require("./middleware");

var _default = {
  Query: {
    getUsers: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref3 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(root, _ref, _ref2) {
        var cursor, limit, models, me;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cursor = _ref.cursor, limit = _ref.limit;
                models = _ref2.models, me = _ref2.me;
                _context.prev = 2;
                _context.t0 = (0, _ramda.pipe)(function (users) {
                  return {
                    edges: (0, _ramda.splitAt)(limit, users)[0],
                    pageInfo: {
                      hasNextPage: users.length > limit,
                      endCursor: users[users.length - 1].createdAt,
                      total: limit
                    }
                  };
                });
                _context.next = 6;
                return models.User.getUsers();

              case 6:
                _context.t1 = _context.sent;
                return _context.abrupt("return", (0, _context.t0)(_context.t1));

              case 10:
                _context.prev = 10;
                _context.t2 = _context["catch"](2);
                console.log(_context.t2);
                return _context.abrupt("return", {
                  error: _context.t2
                });

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 10]]);
      }));

      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }()),
    getUser: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref6 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(root, _ref4, _ref5) {
        var id, models;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref4.id;
                models = _ref5.models;
                _context2.prev = 2;
                _context2.next = 5;
                return models.User.getUser({
                  _id: id
                });

              case 5:
                return _context2.abrupt("return", _context2.sent);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                return _context2.abrupt("return", _errorHandler["default"].serverError());

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref6.apply(this, arguments);
      };
    }()),
    getMe: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref8 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee3(root, args, _ref7, info) {
        var models, me;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                models = _ref7.models, me = _ref7.me;
                _context3.prev = 1;
                _context3.next = 4;
                return models.User.getUser({
                  _id: me.id
                });

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", _errorHandler["default"].serverError());

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 7]]);
      }));

      return function (_x7, _x8, _x9, _x10) {
        return _ref8.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    createUser: function () {
      var _createUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(root, _ref9, _ref10) {
        var input, models, pubSub, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                input = _ref9.input;
                models = _ref10.models, pubSub = _ref10.pubSub;
                _context4.prev = 2;
                _context4.next = 5;
                return models.User.createUser(input);

              case 5:
                user = _context4.sent;
                pubSub.publish("userAdd", {
                  newUser: user
                });
                console.log(user);
                return _context4.abrupt("return", user);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", {
                  error: _context4.t0
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 11]]);
      }));

      function createUser(_x11, _x12, _x13) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }(),
    updateMe: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref13 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(root, _ref11, _ref12) {
        var input, models, me, pubSub, user;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                input = _ref11.input;
                models = _ref12.models, me = _ref12.me, pubSub = _ref12.pubSub;
                _context5.prev = 2;
                _context5.next = 5;
                return models.User.updateUser(me.id, input);

              case 5:
                user = _context5.sent;
                pubSub.publish("user", {
                  updatedUser: user
                });
                return _context5.abrupt("return", user);

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", {
                  status: false,
                  error: _context5.t0
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[2, 10]]);
      }));

      return function (_x14, _x15, _x16) {
        return _ref13.apply(this, arguments);
      };
    }()),
    disableMe: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated,
    /*#__PURE__*/
    function () {
      var _ref15 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6(root, args, _ref14) {
        var models, me, user;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                models = _ref14.models, me = _ref14.me;
                _context6.prev = 1;
                _context6.next = 4;
                return models.User.disableUser(me.id);

              case 4:
                user = _context6.sent;
                return _context6.abrupt("return", user);

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", {
                  error: _context6.t0
                });

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[1, 8]]);
      }));

      return function (_x17, _x18, _x19) {
        return _ref15.apply(this, arguments);
      };
    }()),
    disableUser: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated, _middleware.onlyAdmin,
    /*#__PURE__*/
    function () {
      var _ref18 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(root, _ref16, _ref17) {
        var user_id, models, me;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                user_id = _ref16.user_id;
                models = _ref17.models, me = _ref17.me;
                _context7.prev = 2;
                _context7.next = 5;
                return models.User.disableUser(user_id);

              case 5:
                return _context7.abrupt("return", _context7.sent);

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](2);
                return _context7.abrupt("return", {
                  error: _context7.t0
                });

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[2, 8]]);
      }));

      return function (_x20, _x21, _x22) {
        return _ref18.apply(this, arguments);
      };
    }()),
    updateUser: (0, _graphqlResolvers.combineResolvers)(_middleware.isAuthenticated, _middleware.onlyAdmin,
    /*#__PURE__*/
    function () {
      var _ref21 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(root, _ref19, _ref20) {
        var input, models, me, pubSub, user;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                input = _ref19.input;
                models = _ref20.models, me = _ref20.me, pubSub = _ref20.pubSub;
                _context8.prev = 2;
                _context8.next = 5;
                return models.User.updateUser(input.user_id, input);

              case 5:
                user = _context8.sent;
                pubSub.publish("user", {
                  updatedUser: user
                });
                return _context8.abrupt("return", user);

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8["catch"](2);
                return _context8.abrupt("return", {
                  status: false,
                  error: _context8.t0
                });

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[2, 10]]);
      }));

      return function (_x23, _x24, _x25) {
        return _ref21.apply(this, arguments);
      };
    }()),
    signin: function () {
      var _signin = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(root, _ref22, _ref23) {
        var input, models;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                input = _ref22.input;
                models = _ref23.models;
                _context9.prev = 2;
                _context9.next = 5;
                return models.User.login(input);

              case 5:
                return _context9.abrupt("return", _context9.sent);

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](2);
                return _context9.abrupt("return", _errorHandler["default"].serverError());

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[2, 8]]);
      }));

      function signin(_x26, _x27, _x28) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }(),
    SendEmailToRecoverPassword: function () {
      var _SendEmailToRecoverPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee10(root, email, _ref24) {
        var models;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                models = _ref24.models;
                _context10.prev = 1;
                _context10.next = 4;
                return models.User.sendEmailToRecoverPassword(email);

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10["catch"](1);
                return _context10.abrupt("return", _errorHandler["default"].serverError());

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[1, 7]]);
      }));

      function SendEmailToRecoverPassword(_x29, _x30, _x31) {
        return _SendEmailToRecoverPassword.apply(this, arguments);
      }

      return SendEmailToRecoverPassword;
    }(),
    recoverPassword: function () {
      var _recoverPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee11(root, _ref25, _ref26, info) {
        var input, models;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                input = _ref25.input;
                models = _ref26.models;
                _context11.prev = 2;
                _context11.next = 5;
                return models.User.updatePasswordRecover(input);

              case 5:
                return _context11.abrupt("return", _context11.sent);

              case 8:
                _context11.prev = 8;
                _context11.t0 = _context11["catch"](2);
                console.log(_context11.t0);
                return _context11.abrupt("return", _errorHandler["default"].serverError());

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[2, 8]]);
      }));

      function recoverPassword(_x32, _x33, _x34, _x35) {
        return _recoverPassword.apply(this, arguments);
      }

      return recoverPassword;
    }(),
    updatePassword: function () {
      var _updatePassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee12(root, _ref27, _ref28, info) {
        var input, models, me, ok;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                input = _ref27.input;
                models = _ref28.models, me = _ref28.me;
                _context12.prev = 2;

                if (!(typeof me === "undefined" || me === {})) {
                  _context12.next = 5;
                  break;
                }

                return _context12.abrupt("return", _errorHandler["default"].authenticationError());

              case 5:
                _context12.next = 7;
                return models.User.updatePassword(me.id, input);

              case 7:
                ok = _context12.sent;
                console.log(ok);
                return _context12.abrupt("return", ok);

              case 12:
                _context12.prev = 12;
                _context12.t0 = _context12["catch"](2);
                return _context12.abrupt("return", _errorHandler["default"].serverError());

              case 15:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[2, 12]]);
      }));

      function updatePassword(_x36, _x37, _x38, _x39) {
        return _updatePassword.apply(this, arguments);
      }

      return updatePassword;
    }()
  },
  Subscription: {
    newUser: {
      subscribe: function subscribe(parent, args, _ref29, info) {
        var pubSub = _ref29.pubSub;
        // console.log(await models.User.getUser({ _id: user_id }));
        return pubSub.asyncIterator("userAdd");
      }
    },
    updatedUser: {
      subscribe: function subscribe(parent, _ref30, _ref31, info) {
        var user_id = _ref30.user_id;
        var models = _ref31.models,
            pubSub = _ref31.pubSub;
        console.log(user_id);
        return pubSub.asyncIterator("user");
      }
    }
  },
  User: {
    resetPassword: function () {
      var _resetPassword = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee13(_ref32) {
        var id, _resetPassword2;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                id = _ref32.id;
                _context13.prev = 1;
                _context13.next = 4;
                return _passwordResetController["default"].getResetPassword(id);

              case 4:
                _resetPassword2 = _context13.sent;
                return _context13.abrupt("return", _resetPassword2);

              case 8:
                _context13.prev = 8;
                _context13.t0 = _context13["catch"](1);
                return _context13.abrupt("return", _context13.t0);

              case 11:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[1, 8]]);
      }));

      function resetPassword(_x40) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }
};
exports["default"] = _default;