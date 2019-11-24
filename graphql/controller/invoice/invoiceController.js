import productController from "../products/productController";
import CatchHandler from "../errorController";
import Invoice from "./invoiceModel";
import invoiceModel from "./invoiceModel";
export default {
  createInvoice: async data => {
    try {
      const invoice = await Invoice.create(data);

      const productMap = invoice.details;
      productMap.map(async sub => {
        const prod = await productController.getProduct({ _id: sub.product });
        const newValue = prod.product.stock - sub.stock;
        await productController.updateProduct(sub.product, {
          stock: newValue
        });
      });
      return invoice;
    } catch (error) {
      console.log({ error });
      return { error: CatchHandler(error) };
    }
  },
  // updateInvoice: async (id, data) => {
  //   try {
  //     const invoice = await Invoice.findByIdAndUpdate(id, { details: data });

  //     return { Invoice };
  //   } catch (error) {
  //     return { error };
  //   }
  // },
  CancelInvoice: async id => {
    try {
      const invoice = await Invoice.findByIdAndRemove(id, {
        status: "Canceled"
      });
      invoice.details.map(async sub => {
        const prod = await productController.getProduct({ _id: sub.product });
        const newValue = prod.product.stock + sub.stock;
        await productController.updateProduct(sub.product, {
          stock: newValue
        });
      });

      return { invoice };
    } catch (error) {
      return { error };
    }
  },
  getInvoice: async id => {
    try {
      return { invoice: await Invoice.findById(id) };
    } catch (error) {
      console.log(error);
      return { error: CatchHandler(error) };
    }
  },
  getInvoices: async (limit, offset) => {
    try {
      const counted = await Invoice.countDocuments();
      const invoice = await Invoice.find()
        .skip(offset)
        .limit(limit)
        .lean();
      return { invoice, counted };
    } catch (error) {
      console.log(error);
      return { error: CatchHandler(error) };
    }
  }
};
