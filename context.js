import jwt from "jsonwebtoken";
import models from "./graphql/controller";
import { PubSub } from "graphql-subscriptions";
import { AuthenticationError, UserInputError } from "apollo-server-express";

const pubSub = new PubSub();

const getMe = async req => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].replace(/JWT|Bearer/i, "").trim()
    : null;
  if (token) {
    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError(
        "Your Session has expired, Sign in Again..!"
      );
    }
  }
};
const context = async ({ req, connection }) => {
  if (connection) {
    return {
      models,
      pubSub
    };
  }
  if (req) {
    const me = await getMe(req);
    return {
      models,
      me,
      pubSub,
      secret: process.env.JWT_SECRET
    };
  }
};
export default context;
