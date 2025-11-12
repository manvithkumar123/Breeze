import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { UploadNewsApi } from "../Api/News";

export const useUploadNews = () => {
    const [imageUrl,setImageUrl]=useState<string>("")
    const [newsTitle,setNewsTitle]=useState<string>("")
    const [newsUrl,setNewsUrl]=useState<string>("")

    const {
        mutate:UploadNews,
        data: NewsUploadResponse,isPending,error,isSuccess}=useMutation({
            mutationFn:async()=>{
               const response =  await UploadNewsApi(imageUrl,newsTitle,newsUrl);
                return response;
            },
            onSuccess: (data) => {
              console.log(data); 
                if (data.status === "success"){ 
                  toast.success(data?.output)
                }
                else{ 
                  toast.error(data?.output)
                };
              },
              onError: (error: any) => {
                toast.error(error.message || "upload failed");
              }
        })
        return {isPending,error,isSuccess,NewsUploadResponse,
          UploadNews,setImageUrl,setNewsTitle,setNewsUrl,
          imageUrl,newsTitle,newsUrl}
    }


