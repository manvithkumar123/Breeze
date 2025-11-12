import { LoginUser, LogoutUser, RegisterUser } from "../Controllers/AuthController";
import express, { Router } from "express"
import { isLogged } from "../Middlewares/isLogged";
const router = express.Router();

router.post("/register",RegisterUser);
router.post("/login",LoginUser);
router.post("/logout",isLogged,LogoutUser);


export default router;