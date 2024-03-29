const Joi = require("joi");

const createProductSchema = Joi.object({
  categoryId: Joi.number().required(),
  bookname: Joi.string().trim().required(),
  bookname: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  // image: Joi.string().trim().required(),
  price: Joi.number().integer().positive().required(),
  authorId: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  bookname: Joi.string().trim(),
  description: Joi.string().trim(),
  price: Joi.number().integer().positive(),

});

const deleteProductSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};