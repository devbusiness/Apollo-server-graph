import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "lso usuarios debn especificar su username"]
    },
    last_name: String,
    username: {
      type: String,
      required: [true, "los usuarios deben especificar su username"]
    },
    password: {
      type: String,
      required: [true, "los usuarios deben especificar su password"]
    }
  },
  {
    timestamps: true,
    collection: "users"
  }
);
export default mongoose.model("users", User);
