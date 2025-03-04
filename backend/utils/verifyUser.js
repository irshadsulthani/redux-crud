import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    
    if(!token) return next(errorHandler(401, "You Need to Login"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err) return next(errorHandler(403, "Token in Not Valid"))

        req.user = user
        next()
    })
}