import mongoose, { mongo } from "mongoose";
const Invoice = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users"
    },
    details: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
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
      }
    ],
    total: {
      type: Number,
      required: [true, "el total es requerido"]
    },
    status: {
      type: String,
      enum: ["Active", "Canceled", "Sold"],
      default: "Active"
    }
  },
  {
    timestamps: true,
    collection: "invoices",
    skipVersioning: true,
    versionKey: false
  }
);

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
export default mongoose.model("invoices", Invoice);
