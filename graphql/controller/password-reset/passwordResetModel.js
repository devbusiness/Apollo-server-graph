import mongoose, { Schema } from "mongoose";
import validator from "validator";
const ResetPassword = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "los usuarios deben estar "],
      unique: true,
      validate: validator.isMongoId
    },
    description: {
      type: String,
      validate: validator.isAlpha
    },
    times: {
      type: Number,
      required: true,
      validate: validator.isNumeric
    },
    token: {
      type: String,
      required: [true, "los usuarios deben tener un token "],
      unique: true
    }
  },
  {
    timestamps: true,
    collection: "resetPasswords",
    skipVersioning: true,
    versionKey: false
  }
);
export default mongoose.model("resetPasswords", ResetPassword);
