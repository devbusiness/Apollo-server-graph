import mongoose from "mongoose";
import validator from "validator";
const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true,
      maxlength: 60
      // validate: [validator.i, "Solo deben ser letras"]
    },
    ref: {
      type: String,
      required: true,
      validate: [
        validator.isAscii,
        validator.isAlphanumeric,
        "la referencia debe tener la combinacion"
      ],
      unique: [true, "el codigo no puede ser repetido"]
    },
    price: {
      type: Number,
      required: [true, "el precio es requerido"]
      // validate: [validator.isDecimal, "el precio debe ser decimal"]
    },
    iva: {
      type: Number,
      required: [true, "el iva es requerido"]
      // validate: [validator.isDecimal, "el precio debe ser decimal"]
    },
    stock: {
      type: Number,
      required: [true, "el stock es requerido"]
      // validate: [val validator.isNumeric, "el stock debe ser numerico"]
    }
  },
  {
    timestamps: true,
    collection: "products",
    skipVersioning: true,
    versionKey: false
  }
);

Product.pre("save", async function(next) {
  if (this.iva <= 0 || this.iva > 100) {
    return next(new Error("El iva debe ser mayor que 0 y menor que 100"));
  } else if (this.price <= 0) {
    return next(new Error("El precio debe ser mayor que 0"));
  }
  this.price = this.price + this.price * (this.iva / 100);
  return next();
});

const productModel = mongoose.model("products", Product);

export default productModel;
