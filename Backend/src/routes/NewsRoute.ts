import { Getall_News, UploadNews } from "../Controllers/NewsControll";
import express, { Router } from "express"
import { isLogged } from "../Middlewares/isLogged";
const router = express.Router();

router.post("/upload-news",isLogged,UploadNews);
router.get("/Get-news",Getall_News);

export default router;