const Joi = require('joi');

const recipeSchema=Joi.object({
    name:Joi.string().required(),
    description:Joi.string().required(),
    email:Joi.string().required(),
    ingredient:Joi.array().required(),
    image:Joi.string().required(),
})
const reviewSchema=Joi.object({
rating:Joi.number().min(0).max(5),
comment:Joi.string().trim(),
})
module.exports={recipeSchema,reviewSchema} 