"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogged = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
const JWT_TOKEN = process.env.JWT_TOKEN;
const isLogged = async (req, res, next) => {
    const token = req.cookies.UserToken;
    if (!token) {
        res.status(401).json({ output: "An error occured make sure you are logged in" });
    }
    else {
        if (!JWT_TOKEN) {
            throw new Error("JWT_TOKEN is not defined in environment variables");
        }
        const decode = jsonwebtoken_1.default.verify(token, JWT_TOKEN);
        const loggeduser = await (0, UserModel_1.findUser_nopass)(decode.email);
        if (!loggeduser) {
            res.status(401).json({ output: "An error occured please try again later" });
        }
        else {
            req.user = loggeduser;
            next();
        }
    }
};
exports.isLogged = isLogged;
