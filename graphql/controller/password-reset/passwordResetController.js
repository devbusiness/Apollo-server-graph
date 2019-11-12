import Reset from "./passwordResetModel";
export default {
  createReset: async data => {
    try {
      const reset = await Reset.findOne({ user: data.user });
      if (!reset) {
        data.times = 1;
        const sending = await Reset.create(data);
        return await sending.save();
      }
      data.times = reset.times + 1;
      return await Reset.findByIdAndUpdate(reset._id, data);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  //falta por terminar
  getResetPassword: async userId => {
    try {
      return await Reset.findOne({ user: userId });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
