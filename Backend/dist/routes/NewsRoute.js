"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NewsControll_1 = require("../Controllers/NewsControll");
const express_1 = __importDefault(require("express"));
const isLogged_1 = require("../Middlewares/isLogged");
const router = express_1.default.Router();
router.post("/upload-news", isLogged_1.isLogged, NewsControll_1.UploadNews);
router.get("/Get-news", NewsControll_1.Getall_News);
exports.default = router;
