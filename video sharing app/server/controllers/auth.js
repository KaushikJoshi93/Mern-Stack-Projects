import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../customError.js';
import jwt from 'jsonwebtoken';


export const signup = async(req , res , next)=>{
    try {
        const salt  =  bcrypt.genSaltSync(10);
        const hashed_pass =  bcrypt.hashSync(req.body.password , salt);
        const newUser = User({...req.body , password: hashed_pass});

        await newUser.save();
        res.status(200).json("User has been created");
    } catch (err) {
        next(err);
    }
};

export const signin = async(req , res , next)=>{
    try {
        const user = await User.findOne({name:req.body.name});
        if(!user) return next(createError(404 , "User not found"));

        const isCorrect = await bcrypt.compare(req.body.password , user.password);

        if(!isCorrect) return next(createError(404 , "Wrong Credentials!!"));

        const token = jwt.sign({id:user._id} , process.env.JWT);
        const {password , ...others}  = user._doc;
        res.cookie("access_token" , token , {
            httpOnly:true
        }).status(200).json(others);
    } catch (err) {
        next(err);
    }
}

export const googleAuth = async(req , res , next)=>{
    try {
        const user = await User.findOne({email:req.body.email});
        if(user){
            const token = jwt.sign({id:user._id} , process.env.JWT);
            res.cookie("access_token" , token , {
                httpOnly:true
            }).status(200).json(user._doc);
        }
        else{
            const newUser = new User({...req.body , fromGoogle : true});
            const savedUser = await newUser.save();
            const token = jwt.sign({id:savedUser._id} , process.env.JWT);
            res.cookie("access_token" , token , {
                httpOnly:true
            }).status(200).json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
}

export const logout = async(req , res , next)=>{
   try {
     res.cookie("access_token" , "none" , {
         expires:new Date(Date.now() + 5 * 1000),
         httpOnly:true,
     });
     res.status(200).json("Logged out successfully!!");
   } catch (err) {
        next(err);
   }

}