import jwt from "jsonwebtoken"
import express from "express"
import { findUser_nopass } from "../models/UserModel";
const JWT_TOKEN = process.env.JWT_TOKEN;

declare global {
    namespace Express {
      interface Request {
        user?: any;
      }
    }
  }

  export const isLogged = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const token = req.cookies.UserToken;
    if(!token){
        res.status(401).json({output:"An error occured make sure you are logged in"});
    }
    else{
        if (!JWT_TOKEN) {
          throw new Error("JWT_TOKEN is not defined in environment variables");
        }
        const decode = jwt.verify(token, JWT_TOKEN!) as jwt.JwtPayload & { email: string };
        const loggeduser = await findUser_nopass(decode.email);
        if(!loggeduser){
            res.status(401).json({output:"An error occured please try again later"});
        }
        else{
            req.user=loggeduser;
            next();
        }
    }

}