import jwt from "jsonwebtoken";
import { pipe, __ } from "ramda";
// import validateShema from "../controller/user/validationSchema";
import Joi from ".././usefull/joiValidator";
import Reset from "../controller/password-reset/passwordResetController";
import bcrypt from "bcrypt";
import handleError from "../usefull/errorHandler";
import errorHandler from "../usefull/errorHandler";

export default {
  Query: {
    getUsers: async (root, args, { models }) => {
      try {
        return await models.User.getUsers();
      } catch (error) {
        console.log(error);
        return { error };
      }
    },
    getUser: async (root, { id }, { models }) => {
      try {
        return await models.User.getUser({ _id: id });
      } catch (error) {
        return handleError.serverError();
      }
    }
  },

  Mutation: {
    createUser: async (root, { input }, { models }) => {
      try {
        // const validate = Joi(input, "userSave");
        // if (validate !== null) {
        //   return errorHandler.userInputError(validate);
        // }
        const user = await models.User.createUser(input);
        console.log(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async (root, { input }, { models, me }) => {
      try {
        return await models.User.updateUser(me.id, input);
      } catch (error) {
        console.log(error);
        return { status: false, error };
      }
    },

    signin: async (root, { input }, { models }) => {
      try {
        return await models.User.login(input);
      } catch (error) {
        return handleError.serverError();
      }
    },
    SendEmailToRecoverPassword: async (root, email, { models }) => {
      try {
        return await models.User.sendEmailToRecoverPassword(email);
      } catch (error) {
        return handleError.serverError();
      }
    }
  },
  User: {
    resetPassword: async ({ id }) => {
      try {
        const resetPassword = await Reset.getResetPassword(id);
        return resetPassword;
      } catch (error) {
        return error;
      }
    }
  }
};
