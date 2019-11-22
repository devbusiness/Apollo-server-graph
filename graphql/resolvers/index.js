import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolver = {
  Date: GraphQLDateTime
};
import User from "./User";
import Reset from "./ResetPassword";
export default [User, Reset, customScalarResolver];
