import Joi, { Schema } from 'joi'
import createError from 'http-errors'
import express from 'express'

function validatorHandler(schema:Joi.ObjectSchema, property:String){
    return (req:Express.Request, res:Express.Response, next:express.NextFunction) =>{
        const data = req[`${property}`]
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(createError(400, `Error - Invalid Schema: ${error}`));
        }
        next();
    }
}

export { validatorHandler };