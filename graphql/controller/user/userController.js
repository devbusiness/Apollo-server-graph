import User from "./userModel";
import ResetController from "../password-reset/passwordResetController";
import { tryCatch, __, map } from "ramda";
import bcrypt from "bcrypt";
import uuidV4 from "uuid/v4";
import jwt from "jsonwebtoken";
import { transform } from "../../usefull";
import handleError from "../../usefull/errorHandler";

const transformData = transform({ _id: "id" }, ["password"])(__);

const handleQuery = data =>
  tryCatch(user => user, error => handleError.serverError(500, error))(data);

const generateToken = data =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const hashPassword = passw => bcrypt.hashSync(passw, 10);
const comparePassw = (input, saved) => bcrypt.compareSync(input, saved);

export default {
  createUser: async input => {
    try {
      const newUser = await User.create(input);

      newUser.password = hashPassword(input.password);

      await newUser.save();

      const token = generateToken({ id: newUser._id });

      newUser.password = undefined;

      console.log(newUser);

      return { user: newUser, token };
    } catch (error) {
      return { error };
    }
  },

  updateUser: async (id, input) => {
    //only to updated name and username
    try {
      const user = await User.findById(id).select("-password");
      console.log(user);
      if (!user) {
        return null;
      }
      const upated = await User.findOneAndUpdate(user._id, input).select(
        "-password"
      );
      return upated;
    } catch (error) {
      return { error };
    }
  },
  getUsers: async () => {
    try {
      return await User.find({})
        .sort("-createdAt")
        .select("-password")
        .lean();
    } catch (error) {
      return error;
    }
  },
  login: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = generateToken({ id: user._id });
          return { user, token };
        }
        return handleError.serverError(409, "Credential doesn't match");
      }
      return handleError.serverError(404, "User not found");
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getUser: async where => {
    try {
      return User.findOne({ ...where }).select("-password");
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  sendEmailToRecoverPassword: async where => {
    try {
      const user = await User.findOne(where).select("-password");
      if (!user) {
        return handleError.serverError(404, "User not found");
      }
      const token = uuidV4() + uuidV4();
      const description = "peticion desde el email";
      const data = { token, description, user: user._id };
      return ResetController.createReset(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // deleteUser: where => User.findOneAndDelete(where)
};
