"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var ResetPassword = new _mongoose["default"].Schema({
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    required: [true, "los usuarios deben estar "],
    unique: true,
    validate: _validator["default"].isMongoId
  },
  description: {
    type: String,
    validate: _validator["default"].isAlpha
  },
  times: {
    type: Number,
    required: true,
    validate: _validator["default"].isNumeric
  },
  token: {
    type: String,
    required: [true, "los usuarios deben tener un token "],
    unique: true
  }
}, {
  timestamps: true,
  collection: "resetPasswords",
  skipVersioning: true,
  versionKey: false
});

var _default = _mongoose["default"].model("resetPasswords", ResetPassword);

exports["default"] = _default;