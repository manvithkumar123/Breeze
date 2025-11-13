"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../Controllers/AuthController");
const express_1 = __importDefault(require("express"));
const isLogged_1 = require("../Middlewares/isLogged");
const router = express_1.default.Router();
router.post("/register", AuthController_1.RegisterUser);
router.post("/login", AuthController_1.LoginUser);
router.post("/logout", isLogged_1.isLogged, AuthController_1.LogoutUser);
exports.default = router;
