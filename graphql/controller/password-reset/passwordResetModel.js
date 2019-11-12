import mongoose, { Schema } from "mongoose";

const ResetPassword = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "los usuarios deben estar "],
      unique: true
    },
    description: {
      type: String
    },
    times: {
      type: Number,
      required: true
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
