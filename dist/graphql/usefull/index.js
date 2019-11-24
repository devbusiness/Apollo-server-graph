"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _ramda = require("ramda");

var transform = function transform() {
  var renameKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var omitKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return (0, _ramda.pipe)(function (obj) {
    return Object.keys(obj).reduce(function (acum, currentKey) {
      var mapper = renameKeys[currentKey];

      if (typeof mapper === "string") {
        acum[mapper] = obj[currentKey];
        delete acum[currentKey];
      } else if ((0, _typeof2["default"])(mapper) === "object") {
        acum[mapper.key] = mapper.value(obj[currentKey]);
        delete acum[currentKey];
      }

      return acum;
    }, obj);
  }, (0, _ramda.omit)(omitKeys));
};

exports.transform = transform;