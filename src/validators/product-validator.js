const Joi = require("joi");

const createProductSchema = Joi.object({
  categoryId: Joi.number().required(),
  bookname: Joi.string().trim().required(),
  bookname: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  image: Joi.string().trim().required(),
  price: Joi.number().integer().positive().required(),
  authorId: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  categoryId: Joi.number().required(),
  bookname: Joi.string().trim().required(),
  bookname: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  image: Joi.string().trim().required(),
  price: Joi.number().integer().positive().required(),
  authorId: Joi.number().required(),
});

const deleteProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};