import { ForbiddenError, AuthenticationError } from "apollo-server";
import { skip, combineResolvers } from "graphql-resolvers";

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

export const onlyAdmin = combineResolvers(
  isAuthenticated,
  async (parent, { input }, { models, me }) => {
    return me.roles.includes("Admin")
      ? skip
      : new ForbiddenError("Not Authorized for this action..!");
  }
);

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { roles } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);
