import handleError from "../usefull/errorHandler";
import {
  isAuthenticated,
  isSeller,
  onlyAdmin,
  isValidData
} from "./middleware";
import { combineResolvers } from "graphql-resolvers";
import { splitAt } from "ramda";
export default {
  Query: {
    getProduct: async (parent, { where }, { models, me }, info) => {
      try {
        return await models.Product.getProduct(where);
      } catch (error) {
        console.log(error);
        return { error };
      }
    },
    getProducts: combineResolvers(
      isValidData,
      async (parent, { input }, { models }, info) => {
        try {
          const { products, counted, error } = await models.Product.getProducts(
            input.limit,
            input.offset
          );
          if (error) {
            return { error };
          }
          return {
            edges: products,
            pageInfo: {
              hasNextPage: input.limit < counted,
              total: Math.ceil(products.length),
              hasPreviousPage: input.offset > 0,
              endCursor: products[products.length - 1].createdAt,
              pages: Math.ceil(counted / products.length)
            }
          };
        } catch (error) {
          console.log(error);
          return handleError.serverError();
        }
      }
    )
  },
  Mutation: {
    updateProduct: combineResolvers(
      isSeller,
      async (parent, { input }, { models, me }, info) => {
        try {
          const data = { ...input, id: null };
          return await models.Product.updateProduct(input.id, data);
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    ),

    deleteProduct: combineResolvers(
      isSeller,
      async (parent, { id }, { models, me }, info) => {
        try {
          return await models.Product.deleteProduct(id);
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    ),
    createProduct: combineResolvers(
      isSeller,
      async (parent, { input }, { models, me }, info) => {
        try {
          return await models.Product.createProduct(input);
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    )
  },
  Subscription: {}
};
