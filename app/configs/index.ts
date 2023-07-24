const env = process.env.NODE_ENV || 'development';

let config = require(`./${env}`)

export default config;