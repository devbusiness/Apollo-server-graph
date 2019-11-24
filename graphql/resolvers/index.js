import { GraphQLDateTime } from "graphql-iso-date";

const customScalarResolver = {
  Date: GraphQLDateTime
};
import User from "./User";
import Reset from "./ResetPassword";
import Product from "./Product";
import Invoice from "./Invoice";
export default [User, Reset, Product, Invoice, customScalarResolver];
