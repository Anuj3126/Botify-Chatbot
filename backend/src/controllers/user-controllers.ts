import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";

export const getAllUsers = async (req:Request,res:Response,next:NextFunction)=>{
    //get all users
    try{
        const users = await User.find();
        return res.status(200).json({message:"OK",users});
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
    }
}

export const userSignup = async (req:Request,res:Response,next:NextFunction)=>{
    //User Sign up
    try{
        const { name,email,password } = req.body;
        const existingUser= await User.findOne({ email });
        if(existingUser) return res.status(401).send("User already has an account!");
        const hashedPassword =await hash(password, 10);
        const user = new User({ name, email, password:hashedPassword });
        await user.save();

        // create token and store cookie
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });

        const token=createToken(user._id.toString(),user.email,"7d");
        const expires= new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        });

        return res.status(201).json({message:"OK", name:user.name,email:user.email});
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
    }
}

export const userLogin = async (req:Request,res:Response,next:NextFunction)=>{
    //User Login
    try{
        const { email,password } = req.body;
        const existingUser= await User.findOne({ email });
        if (!existingUser){
            return res.status(401).send("User does not exist!");
        }
        const isPasswordCorrect= await compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password")
        }
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });

        const token=createToken(existingUser._id.toString(),existingUser.email,"7d");
        const expires= new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
            signed:true,
        });


        return res.status(200).json({message:"OK", name:existingUser.name,email:existingUser.email });
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
    }
}

export const verifyUser = async (req:Request,res:Response,next:NextFunction)=>{
    //User Login
    try{
        const existingUser= await User.findById(res.locals.jwtData.id);
        if (!existingUser){
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (existingUser._id.toString()!==res.locals.jwtData.id){
            return res.status(401).send("Authorization Failed!");
        }
        return res.status(200).json({message:"OK", name:existingUser.name,email:existingUser.email });
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
    }
}

export const userLogout = async (req:Request,res:Response,next:NextFunction)=>{
    //User Login
    try{
        const existingUser= await User.findById(res.locals.jwtData.id);
        if (!existingUser){
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        if (existingUser._id.toString()!==res.locals.jwtData.id){
            return res.status(401).send("Authorization Failed!");
        }

        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain:"localhost",
            signed:true,
            path:"/"
        });
        
        return res.status(200).json({message:"OK", name:existingUser.name,email:existingUser.email });
    }
    catch(error){
        console.log(error);
        return res.status(200).json({message:"ERROR",cause:error.message});
    }
}