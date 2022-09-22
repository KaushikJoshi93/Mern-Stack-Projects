import jwt from 'jsonwebtoken'
import { createError } from './customError.js';

export const  verifytoken = (req , res , next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(createError(401 , "You are not authentiacated!!"));

    jwt.verify(token , process.env.JWT , (err , user)=>{
        if(err) return next(createError(403 , "Token is not valid!!"));
        req.user = user;
        next();
    })
}