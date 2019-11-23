import Product from "./productsModel";

export default {
  createProduct: async data => {
    try {
      const product = await Product.create(data);
      return { product };
    } catch (error) {
      console.log({ error });
      return { error };
    }
  },
  updateProduct: async (id, data) => {
    try {
      const product = await Product.findByIdAndUpdate(id, data);
      console.log(product);
      return { product };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  deleteProduct: async id => {
    try {
      return { product: await Product.findByIdAndRemove(id) };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  getProduct: async where => {
    try {
      return { product: await Product.findOne({ ...where }) };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  getProducts: async () => {
    try {
      return { product: await Product.find({}) };
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
};
