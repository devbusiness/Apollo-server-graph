"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _default = {
  Query: {
    getResetPasswordBeforeChange: function () {
      var _getResetPasswordBeforeChange = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(root, _ref, _ref2, info) {
        var token, models;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = _ref.token;
                models = _ref2.models;
                _context.prev = 2;
                _context.next = 5;
                return models.Reset.getResetPasswordBeforeChange(token);

              case 5:
                return _context.abrupt("return", _context.sent);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", {
                  error: "Server internal error..!"
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 8]]);
      }));

      function getResetPasswordBeforeChange(_x, _x2, _x3, _x4) {
        return _getResetPasswordBeforeChange.apply(this, arguments);
      }

      return getResetPasswordBeforeChange;
    }()
  }
};
exports["default"] = _default;