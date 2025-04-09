const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required().trim(),
  author: Joi.string().required().trim(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
  genre: Joi.string().required().trim()
});

const updateBookSchema = Joi.object({
  title: Joi.string().trim(),
  author: Joi.string().trim(),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()),
  genre: Joi.string().trim()
}).min(1);

module.exports = {
  bookSchema,
  updateBookSchema
};