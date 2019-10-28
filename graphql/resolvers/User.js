import jwt from "jsonwebtoken";
import {
  validateShema,
  validateShemaUpdate,
  validateSignin
} from "../controller/user/validationSchema";
import { transform } from "../usefull";
import bcrypt from "bcrypt";
import handleError from "../usefull/errorHandler";
import errorHandler from "../usefull/errorHandler";

const transformData = data =>
  transform({ _id: "id" }, ["__v", "password"])(data);

export default {
  Query: {
    getUsers: async (root, args, { models }) => {
      try {
        return (await models.User.getUsers().lean()).map(transformData);
      } catch (error) {
        return handleError.serverError();
      }
    },
    getUser: async (root, { id }, { models, me }) => {
      try {
        console.log(me);
        const user = await models.User.getUser({ _id: id });
        if (user === null) {
          return handleError.serverError(400, "User not Found");
        }
        return { ...transformData(user) };
      } catch (error) {
        return handleError.serverError();
      }
    }
  },
  Mutation: {
    createUser: async (root, { input }, { models }) => {
      try {
        const newUser = input;
        const validate = validateShema(newUser);
        if (validate !== null) {
          return errorHandler.userInputError(validate);
        }
        const token = jwt.sign({ ...userCreated }, process.env.SECRET, {
          expiresIn: process.env.expiresIn
        });
        newUser.password = bcrypt.hashSync(newUser.confirmPassword, 10);
        const userCreated = transformData(
          await models.User.createUser(newUser)
        );
        return { user: userCreated, token };
      } catch (error) {
        return handleError.serverError();
      }
    },
    updateUser: async (root, { input }, { models }) => {
      try {
        const validate = validateShemaUpdate(input);
        if (validate !== null) {
          return errorHandler.userInputError(validate);
        }
        if (input.password) {
          userUpdated.password = bcrypt.hashSync(input.password, 10);
        }
        const userUpdated = transformData(
          await models.User.updateUser({ _id: input.id }, input)
        );
        return { ...userUpdated };
      } catch (error) {
        return handleError.serverError();
      }
    },
    signin: async (root, { input }, { models }) => {
      try {
        const validate = validateSignin(input);
        if (validate !== null) {
          return errorHandler.userInputError(validate);
        }
        const user = await models.User.getUser({ username: input.username });
        if (user) {
          if (bcrypt.compareSync(input.password, user.password)) {
            const userLogged = transformData(user);
            const token = jwt.sign(
              { id: user.id, username: user.username, name: user.name },
              process.env.SECRET,
              {
                expiresIn: process.env.expiresIn
              }
            );
            return { user: userLogged, token };
          }
          return handleError.serverError(409, "Credential doesn't match");
        }
        return handleError.serverError(404, "User not found");
      } catch (error) {
        return handleError.serverError();
      }
    }
  }
};
