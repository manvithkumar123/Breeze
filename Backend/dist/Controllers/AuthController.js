"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutUser = exports.LoginUser = exports.RegisterUser = void 0;
const UserModel_1 = require("../models/UserModel");
const UserModel_2 = require("../models/UserModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const GenerateToken_1 = require("../utils/GenerateToken");
const RegisterUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ output: "An error occured please check you entered all credentials  ", status: "failed" });
        }
        const existingUser = await (0, UserModel_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ output: "Email already registered please login with your credentials", status: "failed" });
        }
        else {
            const hashPassword = await bcrypt_1.default.hash(password, 10);
            const newUser = await (0, UserModel_2.createUser)({ username, password: hashPassword, email });
            return res.status(201).json({ output: "user created sucessfully please login with your credentials ", status: "success" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ output: "Internal Server Error try again later", status: "error" });
    }
};
exports.RegisterUser = RegisterUser;
const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const User = await (0, UserModel_1.findUserByEmail)(email);
    if (!User) {
        return res.status(400).json({ output: "An error occured please check your entered credentials", status: "failed" });
    }
    else {
        try {
            const isMatch = await bcrypt_1.default.compare(password, User.password);
            if (!isMatch) {
                return res.status(400).json({ output: "An error occured please check your Password", status: "failed" });
            }
            else {
                const token = (0, GenerateToken_1.generateToken)({ email: User.email });
                res.cookie("UserToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000, });
                return res.status(200).json({ output: "You have been logged in sucessfully, you can continue", status: "success" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ output: "internal server error while logging in try again later", status: "error" });
        }
    }
};
exports.LoginUser = LoginUser;
const LogoutUser = async (req, res) => {
    try {
        if (req.user) {
            res.clearCookie("UserToken");
            return res.status(200).json({ output: "You have been logged out sucessfully", status: "success" });
        }
        else {
            return res.status(200).json({ output: "Please login first to logout", status: "success" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ output: "internal server error while logging in try again later", status: "error" });
    }
};
exports.LogoutUser = LogoutUser;
