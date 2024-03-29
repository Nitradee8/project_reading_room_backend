const Joi = require('joi')

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,30}$/)
      .trim()
      .required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .trim()
      .required()
      .strip()
  });

  exports.registerSchema = registerSchema;