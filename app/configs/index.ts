const env = process.env.NODE_ENV || 'development';

let config = require(`./${env}.ts`)

export default config;