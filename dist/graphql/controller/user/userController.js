"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("./userModel"));

var _passwordResetController = _interopRequireDefault(require("../password-reset/passwordResetController"));

var _ramda = require("ramda");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _errorController = _interopRequireDefault(require("../errorController"));

var _errorHandler = _interopRequireDefault(require("../../usefull/errorHandler"));

var _email = _interopRequireDefault(require("../../usefull/email"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// const transformData = transform({ _id: "id" }, ["password"])(__);
var generateToken = function generateToken(data) {
  return _jsonwebtoken["default"].sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

var hashPassword = function hashPassword(passw) {
  return _bcrypt["default"].hashSync(passw, 10);
};

var comparePassw = function comparePassw(input, saved) {
  return _bcrypt["default"].compareSync(input, saved);
};

var _default = {
  createUser: function () {
    var _createUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(input) {
      var newUser, token;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _userModel["default"].create(input);

            case 3:
              newUser = _context.sent;
              newUser.password = hashPassword(input.password);
              _context.next = 7;
              return newUser.save();

            case 7:
              _context.next = 9;
              return new _email["default"](newUser, "nosee.html").sendWelcome();

            case 9:
              token = generateToken({
                id: newUser._id,
                roles: newUser.roles
              });
              newUser.password = undefined;
              return _context.abrupt("return", {
                user: newUser,
                token: token
              });

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", {
                error: (0, _errorController["default"])(_context.t0)
              });

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    function createUser(_x) {
      return _createUser.apply(this, arguments);
    }

    return createUser;
  }(),
  updateUser: function () {
    var _updateUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(id, input) {
      var user, upated;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _userModel["default"].findById(id).select("-password");

            case 3:
              user = _context2.sent;

              if (user) {
                _context2.next = 6;
                break;
              }

              return _context2.abrupt("return", null);

            case 6:
              _context2.next = 8;
              return _userModel["default"].findOneAndUpdate(user._id, input).select("-password");

            case 8:
              upated = _context2.sent;
              return _context2.abrupt("return", upated);

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", {
                error: (0, _errorController["default"])(_context2.t0)
              });

            case 15:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    function updateUser(_x2, _x3) {
      return _updateUser.apply(this, arguments);
    }

    return updateUser;
  }(),
  getUsers: function () {
    var _getUsers = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _userModel["default"].find({}).sort("-createdAt").select("-password").lean();

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 6:
              _context3.prev = 6;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", {
                error: (0, _errorController["default"])(_context3.t0)
              });

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 6]]);
    }));

    function getUsers() {
      return _getUsers.apply(this, arguments);
    }

    return getUsers;
  }(),
  login: function () {
    var _login = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4(_ref) {
      var username, password, user;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              username = _ref.username, password = _ref.password;
              _context4.prev = 1;
              _context4.next = 4;
              return _userModel["default"].findOne({
                username: username
              });

            case 4:
              user = _context4.sent;

              if (user) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt("return", _errorHandler["default"].serverError(404, "User not found"));

            case 9:
              if (_bcrypt["default"].compareSync(password, user.password)) {
                _context4.next = 13;
                break;
              }

              return _context4.abrupt("return", _errorHandler["default"].authenticationError());

            case 13:
              user.password = null;
              return _context4.abrupt("return", {
                user: user,
                token: generateToken({
                  id: user._id,
                  roles: user.roles
                })
              });

            case 15:
              _context4.next = 20;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", {
                error: (0, _errorController["default"])(_context4.t0)
              });

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[1, 17]]);
    }));

    function login(_x4) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  getUser: function () {
    var _getUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee5(where) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              return _context5.abrupt("return", _userModel["default"].findOne(_objectSpread({}, where)).select("-password"));

            case 4:
              _context5.prev = 4;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", {
                error: (0, _errorController["default"])(_context5.t0)
              });

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 4]]);
    }));

    function getUser(_x5) {
      return _getUser.apply(this, arguments);
    }

    return getUser;
  }(),
  getMe: function () {
    var _getMe = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee6(where) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              return _context6.abrupt("return", _userModel["default"].findOne(_objectSpread({}, where)).select("-password"));

            case 4:
              _context6.prev = 4;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", {
                error: (0, _errorController["default"])(_context6.t0)
              });

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 4]]);
    }));

    function getMe(_x6) {
      return _getMe.apply(this, arguments);
    }

    return getMe;
  }(),
  sendEmailToRecoverPassword: function () {
    var _sendEmailToRecoverPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee7(where) {
      var user, token, description;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _userModel["default"].findOne(where).select("-password");

            case 3:
              user = _context7.sent;

              if (user) {
                _context7.next = 6;
                break;
              }

              return _context7.abrupt("return", _errorHandler["default"].serverError(404, "User not found"));

            case 6:
              token = (0, _v["default"])() + (0, _v["default"])();
              description = "peticion desde el email";
              new _email["default"](user, "reset-token.html").sendPasswordReset();
              return _context7.abrupt("return", _passwordResetController["default"].createReset({
                token: token,
                description: description,
                user: user._id
              }));

            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](0);
              return _context7.abrupt("return", {
                error: (0, _errorController["default"])(_context7.t0)
              });

            case 15:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 12]]);
    }));

    function sendEmailToRecoverPassword(_x7) {
      return _sendEmailToRecoverPassword.apply(this, arguments);
    }

    return sendEmailToRecoverPassword;
  }(),
  recoverPassword: function () {
    var _recoverPassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee8(_ref2, _ref3) {
      var input, models, ok;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              input = _ref2.input;
              models = _ref3.models;
              _context8.prev = 2;
              _context8.t0 = (0, _ramda.pipe)(function (data) {
                return console.log(data);
              });
              _context8.next = 6;
              return models.Reset.getResetPasswordBeforeChange(input.token);

            case 6:
              _context8.t1 = _context8.sent;
              ok = (0, _context8.t0)(_context8.t1);
              console.log(ok);
              return _context8.abrupt("return", {});

            case 12:
              _context8.prev = 12;
              _context8.t2 = _context8["catch"](2);
              return _context8.abrupt("return", {
                error: (0, _errorController["default"])(_context8.t2)
              });

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[2, 12]]);
    }));

    function recoverPassword(_x8, _x9) {
      return _recoverPassword.apply(this, arguments);
    }

    return recoverPassword;
  }(),
  updatePasswordRecover: function () {
    var _updatePasswordRecover = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(input) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.t0 = (0, _ramda.pipe)(
              /*#__PURE__*/
              function () {
                var _ref5 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee9(_ref4) {
                  var user_id, valid, passw, user;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          user_id = _ref4.user_id, valid = _ref4.valid;

                          if (!valid) {
                            _context9.next = 9;
                            break;
                          }

                          _context9.next = 4;
                          return _passwordResetController["default"].clearToken(user_id);

                        case 4:
                          passw = hashPassword(input.password, 10);
                          _context9.next = 7;
                          return _userModel["default"].findByIdAndUpdate(user_id, {
                            password: passw
                          });

                        case 7:
                          user = _context9.sent;
                          return _context9.abrupt("return", {
                            user: user,
                            token: generateToken({
                              id: user_id,
                              roles: user.roles
                            })
                          });

                        case 9:
                          return _context9.abrupt("return", _errorHandler["default"].userInputError("no se ha podido actualiar"));

                        case 10:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x11) {
                  return _ref5.apply(this, arguments);
                };
              }());
              _context10.next = 4;
              return _passwordResetController["default"].getResetPasswordBeforeChange(input.token);

            case 4:
              _context10.t1 = _context10.sent;
              return _context10.abrupt("return", (0, _context10.t0)(_context10.t1));

            case 8:
              _context10.prev = 8;
              _context10.t2 = _context10["catch"](0);
              return _context10.abrupt("return", {
                error: (0, _errorController["default"])(_context10.t2)
              });

            case 11:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 8]]);
    }));

    function updatePasswordRecover(_x10) {
      return _updatePasswordRecover.apply(this, arguments);
    }

    return updatePasswordRecover;
  }(),
  updatePassword: function () {
    var _updatePassword = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12(id, data) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.t0 = (0, _ramda.pipe)(
              /*#__PURE__*/
              function () {
                var _ref6 = (0, _asyncToGenerator2["default"])(
                /*#__PURE__*/
                _regenerator["default"].mark(function _callee11(user) {
                  var password, userUpdated, token;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          if (comparePassw(data.current, user.password)) {
                            _context11.next = 4;
                            break;
                          }

                          return _context11.abrupt("return", _errorHandler["default"].serverError(400, "Your current password does't match..!"));

                        case 4:
                          if (!(data.password !== data.passwordConfirm)) {
                            _context11.next = 8;
                            break;
                          }

                          return _context11.abrupt("return", _errorHandler["default"].userInputError("The passwords doesn't match..!"));

                        case 8:
                          if (!(data.current === data.password)) {
                            _context11.next = 12;
                            break;
                          }

                          return _context11.abrupt("return", _errorHandler["default"].userInputError("That password you can't use now..!"));

                        case 12:
                          password = hashPassword(data.password);
                          _context11.next = 15;
                          return _userModel["default"].findByIdAndUpdate(user._id, {
                            password: password
                          });

                        case 15:
                          userUpdated = _context11.sent;
                          token = generateToken({
                            id: user._id,
                            roles: user.roles
                          });
                          return _context11.abrupt("return", {
                            token: token,
                            user: userUpdated
                          });

                        case 18:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x14) {
                  return _ref6.apply(this, arguments);
                };
              }());
              _context12.next = 4;
              return _userModel["default"].findById(id).select("+password");

            case 4:
              _context12.t1 = _context12.sent;
              return _context12.abrupt("return", (0, _context12.t0)(_context12.t1));

            case 8:
              _context12.prev = 8;
              _context12.t2 = _context12["catch"](0);
              return _context12.abrupt("return", {
                error: (0, _errorController["default"])(_context12.t2)
              });

            case 11:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 8]]);
    }));

    function updatePassword(_x12, _x13) {
      return _updatePassword.apply(this, arguments);
    }

    return updatePassword;
  }(),
  disableUser: function () {
    var _disableUser = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13(id) {
      var user, saved;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return _userModel["default"].findById(id);

            case 3:
              user = _context13.sent;

              if (user) {
                _context13.next = 6;
                break;
              }

              return _context13.abrupt("return", _errorHandler["default"].serverError(400, "user not found..!"));

            case 6:
              _context13.next = 8;
              return user.update({
                disabled: !user.disabled
              });

            case 8:
              _context13.next = 10;
              return user.save();

            case 10:
              saved = _context13.sent;
              return _context13.abrupt("return", {
                disabled: !user.disabled,
                message: user.disabled === true ? "you has been enabled..!" : "You has been disabled..!"
              });

            case 14:
              _context13.prev = 14;
              _context13.t0 = _context13["catch"](0);
              return _context13.abrupt("return", {
                error: (0, _errorController["default"])(_context13.t0)
              });

            case 17:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 14]]);
    }));

    function disableUser(_x15) {
      return _disableUser.apply(this, arguments);
    }

    return disableUser;
  }()
};
exports["default"] = _default;