import Joi from "@hapi/joi";
import { map } from "ramda";

import handleFields from "./errorHandler";
const validations = {
  userSave: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .required()
      .pattern(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        {
          name:
            "Minimum eight characters, at least one letter, one number and one special character"
          //   invert: true
        }
      ),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .label("!!Password don't match"),
    last_name: Joi.string()
  }),
  userUpdated: Joi.object({
    name: Joi.string().required(),
    id: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string().pattern(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      {
        name:
          "Minimum eight characters, at least one letter, one number and one special character"
        //   invert: true
      }
    ),
    last_name: Joi.string()
  }),
  userSignin: Joi.object({
    password: Joi.string().required(),
    username: Joi.string().required()
  })
};

export default (dataToValidate, ref) => {
  const { error } = validations[ref].validate(dataToValidate, {
    abortEarly: false,
    warning: true,
    allowUnknown: false,
    stripUnknown: true
  });
  if (error !== null || error !== undefined || Object.keys(error).length > 0) {
    return map(x => x.message, error.details);
  }
  return null;
};
