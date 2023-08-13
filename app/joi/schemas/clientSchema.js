import Joi from 'joi'

// Joi documentation: https://joi.dev/api/?v=17.9.1

export const clientSchema = Joi.object({
    firstName:Joi.string().required(),
    lastName:Joi.string().required(),
    age:Joi.number().required(),
    email:Joi.string().email().required()
})
