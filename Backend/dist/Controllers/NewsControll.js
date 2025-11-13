"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getall_News = exports.UploadNews = void 0;
const NewsModel_1 = require("../models/NewsModel");
const UploadNews = async (req, res) => {
    const { imgUrl, title, newsUrl } = req.body;
    try {
        if (!imgUrl || !title || !newsUrl) {
            return res.status(400).json({ output: "All fields are required to upload and login is required", status: "failed" });
        }
        else {
            const Newnews = await (0, NewsModel_1.CreateNews)({ imgUrl, title, newsUrl });
            return res.status(200).json({ output: "News uploaded successfully you can view in homepage", status: "success" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ output: "An internal server error occured please try again later", status: "failed" });
    }
};
exports.UploadNews = UploadNews;
const Getall_News = async (req, res) => {
    try {
        const allNews = await (0, NewsModel_1.GetallNews)();
        if (!allNews || allNews.length === 0) {
            return res.status(404).json({ output: "No news are uploaded please try again later", status: "failed" });
        }
        else {
            return res.status(200).json({ output: allNews, status: "success" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ output: "Internal Server Error try again later", status: "error" });
    }
};
exports.Getall_News = Getall_News;
