import handleError from "../usefull/errorHandler";
import {
  isAuthenticated,
  isSeller,
  onlyAdmin,
  isValidData
} from "./middleware";
import { combineResolvers } from "graphql-resolvers";
export default {
  Query: {
    getInvoice: combineResolvers(
      isAuthenticated,
      async (parent, { id }, { models }, info) => {
        try {
          const invoice = await models.Invoice.getInvoice(id);
          console.log(invoice);
          return invoice;
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    ),
    getInvoices: combineResolvers(
      isAuthenticated,
      async (parent, { limit, offset }, { models }, info) => {
        try {
          const { invoice, counted, error } = await models.Invoice.getInvoices(
            limit,
            offset
          );
          if (error) {
            return { error };
          }
          return {
            edges: invoice,
            pageInfo: {
              hasNextPage: limit < counted,
              total: Math.ceil(invoice.length),
              hasPreviousPage: offset > 0,
              endCursor: invoice[invoice.length - 1].createdAt,
              pages: Math.ceil(counted / invoice.length)
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
    // updateInvoice: combineResolvers(
    //   // isSeller,
    //   async (parent, { input }, { models, me }, info) => {
    //     try {
    //       const data = { ...input, id: null };
    //       return await models.Product.updateProduct(input.id, data);
    //     } catch (error) {
    //       console.log(error);
    //       return { error };
    //     }
    //   }
    // ),

    cancelInvoice: combineResolvers(
      isSeller,
      async (parent, { id }, { models, me }, info) => {
        try {
          return await models.Invoice.CancelInvoice(id);
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    ),
    createInvoice: combineResolvers(
      isSeller,
      async (parent, { input }, { models, me }, info) => {
        try {
          const invoice = await models.Invoice.createInvoice(input);
          return { invoice };
        } catch (error) {
          console.log(error);
          return { error };
        }
      }
    )
  },
  Subscription: {},
  Invoice: {
    seller: async ({ seller }, args, { models }) => {
      try {
        return await models.User.getUser(seller);
      } catch (error) {
        console.log(error);
      }
    },
    customer: async ({ customer }, args, { models }) => {
      try {
        return await models.User.getUser(customer);
      } catch (error) {
        console.log(error);
      }
    },
    details: async ({ details }, args, { models }) => {
      const detailOfPurchase = details.map(async current => ({
        product: (await models.Product.getProduct(current.product)).product,
        _id: current._id,
        price: current.price,
        stock: current.stock,
        subTotal: current.subTotal
      }));
      return detailOfPurchase;
    }
  }
};
