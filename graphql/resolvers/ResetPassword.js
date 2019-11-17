export default {
  Query: {
    getResetPasswordBeforeChange: async (root, { token }, { models }, info) => {
      try {
        return await models.Reset.getResetPasswordBeforeChange(token);
      } catch (error) {
        return { error: "Server internal error..!" };
      }
    }
  }
};
