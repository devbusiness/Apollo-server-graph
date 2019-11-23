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
    getProducts: async (parent, args, { models, me }, info) => {
      try {
        return await models.Product.getProducts();
      } catch (error) {
        console.log(error);
        return { error };
      }
    }
  },
  Mutation: {
    updateProduct: async (parent, { input }, { models, me }, info) => {
      try {
        const data = { ...input, id: null };
        return await models.Product.updateProduct(input.id, data);
      } catch (error) {
        console.log(error);
        return { error };
      }
    },
    deleteProduct: async (parent, { id }, { models, me }, info) => {
      try {
        return await models.Product.deleteProduct(id);
      } catch (error) {
        console.log(error);
        return { error };
      }
    },
    createProduct: async (parent, { input }, { models }, info) => {
      try {
        return await models.Product.createProduct(input);
      } catch (error) {
        console.log(error);
        return { error };
      }
    }
  },
  Subscription: {}
};
