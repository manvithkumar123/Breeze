import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;

export const UploadNewsApi= async(imgUrl:string,title:string,newsUrl:string)=>{
    try{
    const response = await axios.post(`${API_URL}/news/upload-news`,{imgUrl,title,newsUrl},{withCredentials:true})
    return response?.data
    }catch(error:any){
        return error.response?.data || { output: "Unknown error", status: "failed" };
    }
}

export const GetNewsApi = async ()=>{
    try{
        const response = await axios.get(`${API_URL}/news/Get-news`)
        return response?.data
    }catch(error:any){
        return error.response?.data  || { output: "Unknown error", status: "failed" };
    }
}