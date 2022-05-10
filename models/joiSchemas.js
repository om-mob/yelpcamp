const BaseJoi = require("joi");
const sanitizeHTML = require('sanitize-html')

// Extentions
const escapeHTML = {
  validate(value, helpers) {
    // define what a clean value should look like. (using sanitizeHTML here)
    const clean = sanitizeHTML(value, {
      allowedTags: [],
      allowedAttributes: {},
    });
    if (clean !== value) return helpers.error("string.escapeHTML", { value });
  },
};

const extention = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{ #label }} Shouldn't be this naughty",
  },
  rules: {
    escapeHTML,
  },
});

// Extending joi
const Joi = BaseJoi.extend(extention)

// Schemas
const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    location: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});

const reviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string().required().escapeHTML(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});

module.exports = {
  campgroundSchema,
  reviewSchema,
};
