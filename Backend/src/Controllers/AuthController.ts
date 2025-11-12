import { findUserByEmail  } from "../models/UserModel"
import express from "express"
import { createUser } from "../models/UserModel";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/GenerateToken";

export const RegisterUser = async (req: express.Request, res: express.Response) => {
    try{
        const {username,password,email}=req.body;
        if( !username||!email||!password){
        return res.status(400).json({output:"An error occured please check you entered all credentials  ",status:"failed"})
        }
        const existingUser = await findUserByEmail(email);
        if(existingUser) {
            return res.status(400).json({output:"Email already registered please login with your credentials",status:"failed"})
        }
        else{
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser= await createUser({username,password:hashPassword,email});
        return res.status(201).json({output:"user created sucessfully please login with your credentials ",status:"success"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({output:"Internal Server Error try again later",status:"error"})
    }
}

export const LoginUser=async (req:express.Request,res:express.Response)=>{
    const {email,password}=req.body;
    const User=await findUserByEmail(email);
    if(!User){
        return res.status(400).json({output:"An error occured please check your entered credentials",status:"failed"})
    }
    else{
      try{ 
        const isMatch =  await bcrypt.compare(password,User.password);
        if(!isMatch){
            return res.status(400).json({output:"An error occured please check your Password",status:"failed"})
        }
        else{
            const token = generateToken({ email: User.email });
            res.cookie("UserToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000, });
            return res.status(200).json({output:"You have been logged in sucessfully, you can continue",status:"success"})
        }
      }catch(error){
        console.log(error)
        res.status(500).json({output:"internal server error while logging in try again later",status:"error"})
      }

    }
}

export const LogoutUser = async (req:express.Request,res:express.Response)=>{
    try{
        if(req.user){
        res.clearCookie("UserToken");
        return res.status(200).json({output:"You have been logged out sucessfully",status:"success"})
        }
        else{
            return res.status(200).json({output:"Please login first to logout",status:"success"})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({output:"internal server error while logging in try again later",status:"error"})
    }
}