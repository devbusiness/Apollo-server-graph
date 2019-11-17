export default {
  Query: {
    getResetPasswordBeforeChange: async (root, { token }, { models }, info) => {
      try {
        const validateRestore = await models.Reset.getResetPasswordBeforeChange(
          token
        );
        console.log(validateRestore);
        return validateRestore;
      } catch (error) {
        return { error: "Server internal erro" };
      }
    }
  }
};
