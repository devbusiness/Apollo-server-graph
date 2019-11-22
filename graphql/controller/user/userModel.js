import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "los usuarios debn especificar su username"]
    },
    last_name: String,
    username: {
      type: String,
      required: [true, "los usuarios deben especificar su username"],
      unique: [true, "Este username ya se encuentra registrado"]
    },
    password: {
      type: String,
      required: [true, "los usuarios deben especificar su password"]
    },
    email: {
      type: String,
      required: [true, "los usuarios deben tener un email registrado"],
      unique: true
    },
    roles: {
      type: Array,
      required: [true, "los usuarios deben tener minimo un rol"]
    },
    disabled: {
      type: Boolean,
      disabled: [true, "todos los usuarios deben de tener un diabled"],
      default: false
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
