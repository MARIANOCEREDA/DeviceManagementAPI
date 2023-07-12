import passport from 'passport'
import { JwtStrategy } from './jwtStrategy'

passport.use(JwtStrategy)