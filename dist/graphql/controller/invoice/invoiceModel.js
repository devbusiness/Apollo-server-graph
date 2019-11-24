"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var Invoice = new _mongoose["default"].Schema({
  customer: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "users"
  },
  seller: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "users"
  },
  details: [{
    product: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: "products",
      required: [true, "es requerido"]
    },
    price: {
      type: Number,
      required: [true, "el precio es requerido"]
    },
    stock: {
      type: Number,
      required: [true, "la cantidad  es requerida"]
    },
    subTotal: Number
  }],
  total: {
    type: Number,
    required: [true, "el total es requerido"]
  },
  status: {
    type: String,
    "enum": ["Active", "Canceled", "Sold"],
    "default": "Active"
  }
}, {
  timestamps: true,
  collection: "invoices",
  skipVersioning: true,
  versionKey: false
});
/* 
//Invoice.pre("save", function(next) {
//   var total = 0;
//   this.details.map((sub, idx) => {
//     this.details[idx].subTotal = sub.price * sub.stock;
//     total = total + sub.subTotal;
//   });
//   this.total = total;
//   return next();
// });
*/

var _default = _mongoose["default"].model("invoices", Invoice);

exports["default"] = _default;