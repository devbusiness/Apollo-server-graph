"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var User = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: [true, "los usuarios debn especificar su username"],
    validate: [_validator["default"].trim, _validator["default"].isAlpha],
    lowercase: true
  },
  last_name: {
    type: String,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: [true, "los usuarios deben especificar su username"],
    unique: [true, "Este username ya se encuentra registrado"],
    trim: true,
    lowercase: true,
    validate: [_validator["default"].trim, _validator["default"].isAlpha]
  },
  password: {
    type: String,
    required: [true, "los usuarios deben especificar su password"],
    match: [/(?=.*?[0-9])/, "at least a number..!"]
  },
  email: {
    type: String,
    required: [true, "los usuarios deben tener un email registrado"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [_validator["default"].isEmail, "No es un email Valido"]
  },
  roles: {
    type: Array,
    required: [true, "los usuarios deben tener minimo un rol"],
    "default": ["User"]
  },
  disabled: {
    type: Boolean,
    "default": false,
    required: [true, "todos los usuarios deben de tener un diabled"],
    validate: [_validator["default"].toString, _validator["default"].isBoolean, "debe ser boolean..!"]
  }
}, {
  timestamps: true,
  collection: "users",
  skipVersioning: true,
  versionKey: false
});

var _default = _mongoose["default"].model("users", User);

exports["default"] = _default;