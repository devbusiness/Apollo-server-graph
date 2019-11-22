import User from "./userModel";
import ResetController from "../password-reset/passwordResetController";
import { pipe } from "ramda";
import bcrypt from "bcrypt";
import uuidV4 from "uuid/v4";
import jwt from "jsonwebtoken";
import CatchHandler from "../errorController";
// import { transform } from "../../usefull";
import handleError from "../../usefull/errorHandler";
import SendEmail from "../../usefull/email";
// const transformData = transform({ _id: "id" }, ["password"])(__);

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

      await new SendEmail(newUser, "nosee.html").sendWelcome();

      const token = generateToken({ id: newUser._id, roles: newUser.roles });

      newUser.password = undefined;

      return { user: newUser, token };
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },

  updateUser: async (id, input) => {
    //only to updated name and username
    try {
      const user = await User.findById(id).select("-password");
      if (!user) {
        return null;
      }
      const upated = await User.findOneAndUpdate(user._id, input).select(
        "-password"
      );
      return upated;
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  getUsers: async () => {
    try {
      return await User.find({})
        .sort("-createdAt")
        .select("-password")
        .lean();
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  login: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return handleError.serverError(404, "User not found");
      } else {
        if (!bcrypt.compareSync(password, user.password)) {
          return handleError.authenticationError();
        } else {
          user.password = null;
          return {
            user,
            token: generateToken({ id: user._id, roles: user.roles })
          };
        }
      }
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  getUser: async where => {
    try {
      return User.findOne({ ...where }).select("-password");
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  getMe: async where => {
    try {
      return User.findOne({ ...where }).select("-password");
    } catch (error) {
      return { error: CatchHandler(error) };
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
      new SendEmail(user, "reset-token.html").sendPasswordReset();
      return ResetController.createReset({
        token,
        description,
        user: user._id
      });
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  recoverPassword: async ({ input }, { models }) => {
    try {
      const ok = pipe(data => console.log(data))(
        await models.Reset.getResetPasswordBeforeChange(input.token)
      );
      console.log(ok);
      return {};
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  updatePasswordRecover: async input => {
    try {
      return pipe(async ({ user_id, valid }) => {
        if (valid) {
          await ResetController.clearToken(user_id);
          const passw = hashPassword(input.password, 10);
          const user = await User.findByIdAndUpdate(user_id, {
            password: passw
          });
          return {
            user,
            token: generateToken({ id: user_id, roles: user.roles })
          };
        }
        return handleError.userInputError("no se ha podido actualiar");
      })(await ResetController.getResetPasswordBeforeChange(input.token));
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  updatePassword: async (id, data) => {
    try {
      return pipe(async user => {
        if (!comparePassw(data.current, user.password)) {
          return handleError.serverError(
            400,
            "Your current password does't match..!"
          );
        } else if (data.password !== data.passwordConfirm) {
          return handleError.userInputError("The passwords doesn't match..!");
        } else if (data.current === data.password) {
          return handleError.userInputError(
            "That password you can't use now..!"
          );
        } else {
          const password = hashPassword(data.password);
          const userUpdated = await User.findByIdAndUpdate(user._id, {
            password
          });
          const token = generateToken({ id: user._id, roles: user.roles });
          return { token, user: userUpdated };
        }
      })(await User.findById(id).select("+password"));
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  },
  disableUser: async id => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return handleError.serverError(400, "user not found..!");
      }
      await user.update({ disabled: !user.disabled });
      const saved = await user.save();
      return {
        disabled: !user.disabled,
        message:
          user.disabled === true
            ? "you has been enabled..!"
            : "You has been disabled..!"
      };
    } catch (error) {
      return { error: CatchHandler(error) };
    }
  }
};
