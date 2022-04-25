const Joi = require("joi");

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.string().required(),
  }).required(),
});

module.exports = {
  campgroundSchema,
};
