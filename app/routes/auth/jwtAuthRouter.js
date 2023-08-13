import express from 'express'
import passport from 'passport';

const router = express.Router();

router.get('/auth/token',
passport.authenticate('jwt', { scope: ['profile', 'email'] }),
(req, res, next) =>{
    res.status(200).json({message:"Succesfully authenticated with google."})
    next()
}
)

export default router;