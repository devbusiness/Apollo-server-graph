import Product from "./productsModel";
import CatchHandler from "../errorController";
export default {
  createProduct: async data => {
    try {
      const product = await Product.create(data);
      return { product };
    } catch (error) {
      console.log({ error });
      return { error: CatchHandler(error) };
    }
  },
  updateProduct: async (id, data) => {
    try {
      const product = await Product.findByIdAndUpdate(id, data);

      return { product };
    } catch (error) {
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
  getProduct: async id => {
    try {
      return { product: await Product.findOne({ _id: id }) };
    } catch (error) {
      console.log(error);
      return { error };
    }
  },
  getProducts: async (limit, offset) => {
    try {
      const counted = await Product.countDocuments();
      const products = await Product.find()
        .skip(offset)
        .limit(limit);
      return { products, counted };
    } catch (error) {
      console.log(error);
      return { error: CatchHandler(error) };
    }
  }
};
