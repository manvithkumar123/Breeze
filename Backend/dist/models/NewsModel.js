"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetallNews = exports.CreateNews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const CreateNews = async (news) => {
    return await prisma.news.create({
        data: {
            title: news.title,
            imgUrl: news.imgUrl,
            newsUrl: news.newsUrl
        },
    });
};
exports.CreateNews = CreateNews;
const GetallNews = async () => {
    return await prisma.news.findMany();
};
exports.GetallNews = GetallNews;
