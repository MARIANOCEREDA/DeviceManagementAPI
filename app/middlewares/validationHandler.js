import createError from 'http-errors'

function validatorHandler(schema, property){

    return (req, res, next) =>{
        const data = req[`${property}`]
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(createError(400, `Error - Invalid Schema: ${error}`));
        }
        next();
    }
    
}

export { validatorHandler };