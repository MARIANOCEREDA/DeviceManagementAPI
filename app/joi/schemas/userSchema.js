import Joi from 'joi'

// Joi documentation: https://joi.dev/api/?v=17.9.1

export const userSchema = Joi.object({
    id : Joi.string().id(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age:Joi.number().integer().required(),
    city: Joi.string(),
    streetName: Joi.string().required(),
    country: Joi.string().required(),
    accountName: Joi.string()
})