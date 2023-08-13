import Joi from 'joi'

// Joi documentation: https://joi.dev/api/?v=17.9.1

export const loginSchema = Joi.object({
    username:Joi.string().required().max(30),
    password:Joi.string().required().max(30)
})