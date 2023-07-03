import express from 'express'


/**
 * @name logErrors
 * @type Middleware function
 * 
 * @brief Log errors into the console.
 * 
 * @param err Error
 * @param req express.Request
 * @param res expres.Response
 * @param next express.NextFunction
 */
function logErrors (err:Error, req:express.Request, res:express.Response, next:express.NextFunction) {
    console.error(err);
    next(err);
}


/**
 * @name errorHandler 
 * @type Middleware function
 * 
 * @brief Send previously raised errors as response to the client.
 * 
 * @param err Error
 * @param req express.Request
 * @param res expres.Response
 * @param next express.NextFunction
 */  
function errorHandler(err:Error, req:express.Request, res:express.Response, next:express.NextFunction) {
    res.status(500).json({
        name: err.name,
        message: err.message
    });
}

export { logErrors, errorHandler }