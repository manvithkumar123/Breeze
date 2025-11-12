import express from "express";
import { CreateNews, GetallNews } from "../models/NewsModel";

export const UploadNews = async (req:express.Request,res:express.Response)=>{
    const {imgUrl,title,newsUrl}=req.body;
    try{
        if(!imgUrl||!title||!newsUrl){
            return res.status(400).json({output:"All fields are required to upload and login is required",status:"failed"})
        }
        else{
            const Newnews =  await CreateNews({imgUrl,title,newsUrl});
            return res.status(200).json({output:"News uploaded successfully you can view in homepage",status:"success"})
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({output:"An internal server error occured please try again later",status:"failed"})
    }
}
export const Getall_News=async(req:express.Request,res:express.Response)=>{
    try{
        const allNews=await GetallNews();
        if(!allNews || allNews.length===0){
            return res.status(404).json({output:"No news are uploaded please try again later",status:"failed"})
        }
        else{
            return res.status(200).json({output:allNews,status:"success"})
        }
    }catch(error){
        console.log(error);
        res.status(500).json({output:"Internal Server Error try again later",status:"error"})
    }
}