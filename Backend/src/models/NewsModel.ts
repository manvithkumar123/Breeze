

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export interface News {
    id?: number;
    imgUrl:string;
    title:string;
    newsUrl:string;
    uploadDate?:string;
}

export const  CreateNews= async (news : News)=>{
    return await prisma.news.create({
        data: {
          title : news.title,
          imgUrl:news.imgUrl,
          newsUrl:news.newsUrl
        },
    });
}

export const GetallNews= async ()=>{
    return await prisma.news.findMany();
}
