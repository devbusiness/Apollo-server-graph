"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passwordResetModel = _interopRequireDefault(require("./passwordResetModel"));

var _dateFns = require("date-fns");

var _ramda = require("ramda");

var validTime = function validTime(fn, code) {
  return (0, _ramda.pipe)(function (time) {
    return (0, _ramda.comparator)(function (x, y) {
      return x <= y;
    })(time, 24);
  }, function (num) {
    return num === -1 ? {
      user_id: code.user,
      valid: true,
      token: code.token,
      message: "Your code alive..!"
    } : {
      user_id: !code.user ? null : code.user,
      valid: false,
      token: !code.token ? null : "Your last token was " + code.token,
      message: !code.user ? "You never has generated any token..!" : "Your code has expired..!"
    };
  })(fn);
};

var _default = {
  createReset: function () {
    var _createReset = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(data) {
      var reset, sending;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _passwordResetModel["default"].findOne({
                user: data.user
              });

            case 3:
              reset = _context.sent;

              if (reset) {
                _context.next = 12;
                break;
              }

              data.times = 1;
              _context.next = 8;
              return _passwordResetModel["default"].create(data);

            case 8:
              sending = _context.sent;
              _context.next = 11;
              return sending.save();

            case 11:
              return _context.abrupt("return", _context.sent);

            case 12:
              data.times = reset.times + 1;
              _context.next = 15;
              return _passwordResetModel["default"].findByIdAndUpdate(reset._id, data);

            case 15:
              return _context.abrupt("return", _context.sent);

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              return _context.abrupt("return", _context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 18]]);
    }));

    function createReset(_x) {
      return _createReset.apply(this, arguments);
    }

    return createReset;
  }(),
  //falta por terminar
  getResetPassword: function () {
    var _getResetPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(userId) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _passwordResetModel["default"].findOne({
                user: userId
              });

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", _context2.t0);

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 6]]);
    }));

    function getResetPassword(_x2) {
      return _getResetPassword.apply(this, arguments);
    }

    return getResetPassword;
  }(),
  getResetPasswordBeforeChange: function () {
    var _getResetPasswordBeforeChange = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3(token) {
      var code;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _passwordResetModel["default"].findOne({
                token: token
              });

            case 3:
              code = _context3.sent;

              if (!(typeof code === "undefined" || !code)) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", {
                valid: false,
                message: "this user doesn't exist"
              });

            case 8:
              return _context3.abrupt("return", validTime((0, _dateFns.differenceInHours)(Date.now(), (0, _dateFns.getTime)(code.updatedAt)), code));

            case 9:
              _context3.next = 15;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              return _context3.abrupt("return", {
                message: "Internal server error",
                valid: false
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 11]]);
    }));

    function getResetPasswordBeforeChange(_x3) {
      return _getResetPasswordBeforeChange.apply(this, arguments);
    }

    return getResetPasswordBeforeChange;
  }(),
  clearToken: function () {
    var _clearToken = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(user) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _passwordResetModel["default"].findOneAndUpdate({
                user: user
              }, {
                token: "",
                description: "You has changed your password..!"
              });

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              return _context4.abrupt("return", {
                message: "Internal server error"
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 6]]);
    }));

    function clearToken(_x4) {
      return _clearToken.apply(this, arguments);
    }

    return clearToken;
  }()
};
exports["default"] = _default;