import Reset from "./passwordResetModel";
import { getTime, differenceInHours } from "date-fns";
import { pipe, comparator } from "ramda";
const validTime = (fn, code) =>
  pipe(
    time => comparator((x, y) => x <= y)(time, 24),
    num =>
      num === -1
        ? {
            user_id: code.user,
            valid: true,
            token: code.token,
            message: "Your code alive..!"
          }
        : {
            user_id: !code.user ? null : code.user,
            valid: false,
            token: !code.token ? null : "Your last token was " + code.token,
            message: !code.user
              ? "You never has generated any token..!"
              : "Your code has expired..!"
          }
  )(fn);
export default {
  createReset: async data => {
    try {
      const reset = await Reset.findOne({ user: data.user });
      if (!reset) {
        data.times = 1;
        const sending = await Reset.create(data);
        return await sending.save();
      }
      data.times = reset.times + 1;
      return await Reset.findByIdAndUpdate(reset._id, data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  //falta por terminar
  getResetPassword: async userId => {
    try {
      return await Reset.findOne({ user: userId });
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getResetPasswordBeforeChange: async token => {
    try {
      const code = await Reset.findOne({ token });
      if (typeof code === "undefined" || !code) {
        return { valid: false, message: "this user doesn't exist" };
      } else {
        return validTime(
          differenceInHours(Date.now(), getTime(code.updatedAt)),
          code
        );
      }
    } catch (error) {
      console.log(error);
      return { message: "Internal server error", valid: false };
    }
  },
  clearToken: async user => {
    try {
      return await Reset.findOneAndUpdate(
        { user },
        { token: "", description: "You has changed your password..!" }
      );
    } catch (error) {
      console.log(error);
      return { message: "Internal server error" };
    }
  }
};
