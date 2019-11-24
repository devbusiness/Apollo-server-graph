"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(error) {
  var errmsg = "";

  if (error.name === "MongoError") {
    if (error.code === 11000) {
      var value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      errmsg = "duplicate field value ".concat(value, " : please use another value");
    } else if (error.name === "CastError") {
      errmsg = "invalid ".concat(error.path, ": ").concat(error.value);
    } else if (error.code === 2) {
      errmsg = "invalid ".concat(error.errmsg);
    }
  } else if (error.name === "ValidationError") {
    console.log(error);
    errmsg = "".concat(error.path, ": ").concat(error.message);
  }

  return errmsg;
};

exports["default"] = _default;