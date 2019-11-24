import { ForbiddenError, UserInputError } from "apollo-server";
import { skip, combineResolvers } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user..!");

export const onlyAdmin = combineResolvers(
  isAuthenticated,
  async (parent, { input }, { models, me }) => {
    return me.roles.includes("Admin")
      ? skip
      : new ForbiddenError("Not Authorized for this action..!");
  }
);
export const isSeller = combineResolvers(
  isAuthenticated,
  async (parent, { input }, { models, me }) => {
    return me.roles.includes("Seller") || me.roles.includes("Admin")
      ? skip
      : new ForbiddenError("Not Authorized for this action..!");
  }
);
export const isValidData = combineResolvers(
  async (parent, { input }, { models, me }) => {
    input.limit <= 0 && input.offset <= 0
      ? new UserInputError("la data proporcionada debe ser valida")
      : skip;
  }
);
