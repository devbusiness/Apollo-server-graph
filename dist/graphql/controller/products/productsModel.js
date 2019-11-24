"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _validator = _interopRequireDefault(require("validator"));

var Product = new _mongoose["default"].Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    maxlength: 60
  },
  ref: {
    type: String,
    required: true,
    validate: [_validator["default"].isAscii, _validator["default"].isAlphanumeric, "la referencia debe tener la combinacion"],
    unique: [true, "el codigo no puede ser repetido"]
  },
  price: {
    type: Number,
    required: [true, "el precio es requerido"]
  },
  iva: {
    type: Number,
    required: [true, "el iva es requerido"]
  },
  stock: {
    type: Number,
    required: [true, "el stock es requerido"]
  }
}, {
  timestamps: true,
  collection: "products",
  skipVersioning: true,
  versionKey: false
});
Product.pre("save",
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(this.iva <= 0 || this.iva > 100)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", next(new Error("El iva debe ser mayor que 0 y menor que 100")));

          case 4:
            if (!(this.price <= 0)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", next(new Error("El precio debe ser mayor que 0")));

          case 6:
            this.price = this.price + this.price * (this.iva / 100);
            return _context.abrupt("return", next());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var productModel = _mongoose["default"].model("products", Product);

var _default = productModel;
exports["default"] = _default;