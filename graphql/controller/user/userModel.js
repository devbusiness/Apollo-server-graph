import mongoose from "mongoose";
import validator from "validator";
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "los usuarios debn especificar su username"],
      validate: [validator.trim, validator.isAlpha],
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
      validate: [validator.trim, validator.isAlpha]
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
      validate: [validator.isEmail, "No es un email Valido"]
    },
    roles: {
      type: Array,
      required: [true, "los usuarios deben tener minimo un rol"],
      default: ["User"]
    },
    disabled: {
      type: Boolean,
      default: false,
      required: [true, "todos los usuarios deben de tener un diabled"],
      validate: [validator.toString, validator.isBoolean, "debe ser boolean..!"]
    }
  },
  {
    timestamps: true,
    collection: "users",
    skipVersioning: true,
    versionKey: false
  }
);
export default mongoose.model("users", User);
