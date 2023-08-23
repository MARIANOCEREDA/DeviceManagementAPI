import Joi from 'joi'

// Joi documentation: https://joi.dev/api/?v=17.9.1

export const deviceSchema = Joi.object({
    Name:Joi.string().required(),
    Username:Joi.string().required(),
})
