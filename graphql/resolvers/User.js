import { pipe, splitAt } from "ramda";
import Reset from "../controller/password-reset/passwordResetController";
import handleError from "../usefull/errorHandler";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, onlyAdmin } from "./middleware";
export default {
  Query: {
    getUsers: combineResolvers(
      isAuthenticated,
      async (root, { cursor, limit }, { models, me }) => {
        try {
          return pipe(users => ({
            edges: splitAt(limit, users)[0],
            pageInfo: {
              hasNextPage: users.length > limit,
              endCursor: users[users.length - 1].createdAt,
              total: limit
            }
          }))(await models.User.getUsers());
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    ),
    getUser: combineResolvers(
      isAuthenticated,

      async (root, { id }, { models }) => {
        try {
          return await models.User.getUser({ _id: id });
        } catch (error) {
          return handleError.serverError();
        }
      }
    ),

    getMe: combineResolvers(
      isAuthenticated,
      async (root, args, { models, me }, info) => {
        try {
          return await models.User.getUser({ _id: me.id });
        } catch (error) {
          return handleError.serverError();
        }
      }
    )
  },

  Mutation: {
    createUser: async (root, { input }, { models, pubSub }) => {
      try {
        const user = await models.User.createUser(input);

        pubSub.publish("userAdd", {
          newUser: user
        });
        console.log(user);
        return user;
      } catch (error) {
        return { error };
      }
    },
    updateMe: combineResolvers(
      isAuthenticated,
      async (root, { input }, { models, me, pubSub }) => {
        try {
          const user = await models.User.updateUser(me.id, input);
          pubSub.publish("user", { updatedUser: user });
          return user;
        } catch (error) {
          return { status: false, error };
        }
      }
    ),
    disableMe: combineResolvers(
      isAuthenticated,
      async (root, args, { models, me }) => {
        try {
          const user = await models.User.disableUser(me.id);

          return user;
        } catch (error) {
          return { error };
        }
      }
    ),
    disableUser: combineResolvers(
      isAuthenticated,
      onlyAdmin,
      async (root, { user_id }, { models, me }) => {
        try {
          return await models.User.disableUser(user_id);
        } catch (error) {
          return { error };
        }
      }
    ),
    updateUser: combineResolvers(
      isAuthenticated,
      onlyAdmin,
      async (root, { input }, { models, me, pubSub }) => {
        try {
          const user = await models.User.updateUser(input.user_id, input);
          pubSub.publish("user", { updatedUser: user });
          return user;
        } catch (error) {
          return { status: false, error };
        }
      }
    ),

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
    },
    recoverPassword: async (root, { input }, { models }, info) => {
      try {
        return await models.User.updatePasswordRecover(input);
      } catch (error) {
        console.log(error);
        return handleError.serverError();
      }
    },
    updatePassword: async (root, { input }, { models, me }, info) => {
      try {
        if (typeof me === "undefined" || me === {}) {
          return handleError.authenticationError();
        }
        const ok = await models.User.updatePassword(me.id, input);
        console.log(ok);
        return ok;
      } catch (error) {
        return handleError.serverError();
      }
    }
  },
  Subscription: {
    newUser: {
      subscribe(parent, args, { pubSub }, info) {
        // console.log(await models.User.getUser({ _id: user_id }));
        return pubSub.asyncIterator("userAdd");
      }
    },
    updatedUser: {
      subscribe(parent, { user_id }, { models, pubSub }, info) {
        console.log(user_id);
        return pubSub.asyncIterator("user");
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
