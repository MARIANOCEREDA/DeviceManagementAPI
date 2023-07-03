import Joi from 'joi'

// Joi documentation: https://joi.dev/api/?v=17.9.1

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username:Joi.string().max(30).required(),
    phoneNumber:Joi.string().max(50).required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    password:Joi.string().max(30).required(),
    age:Joi.number().integer().required(),
    email:Joi.string().email().required(),
})