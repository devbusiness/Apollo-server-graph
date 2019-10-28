import Joi from "@hapi/joi";
import config from "../config";
//blueprints Validate

const userPrint = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      name:
        "Minimum eight characters, at least one letter, one number and one special character"
      //   invert: true
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .label("!!Password don't match"),
  last_name: Joi.string()
});

const userPrintUpdated = Joi.object({
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
});

const userPrintSignin = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().required()
});

//execute BluePrint
export const validateShema = dataToValidate => {
  const { error } = userPrint.validate(dataToValidate, config.conf_hapi_joi);
  if (error) {
    return error.message;
  }
  return null;
};
export const validateSignin = dataToValidate => {
  const { error } = userPrintSignin.validate(
    dataToValidate,
    config.conf_hapi_joi
  );
  if (error) {
    return error.message;
  }
  return null;
};

export const validateShemaUpdate = dataToValidate => {
  const { error } = userPrintUpdated.validate(
    dataToValidate,
    config.conf_hapi_joi
  );
  if (error) {
    return error.message;
  }
  return null;
};
