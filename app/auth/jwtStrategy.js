import passportJWT from 'passport-jwt'
import config from '../configs/index.js';

const extractJwt = passportJWT.ExtractJwt;

const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.key, 
};

const JwtStrategy = new passportJWT.Strategy(options, (payload, done) => {
    const user = payload
    console.log(payload)
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
});

export { JwtStrategy }