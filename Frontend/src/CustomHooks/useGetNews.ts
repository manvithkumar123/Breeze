
import { useQuery } from "@tanstack/react-query";
import  { GetNewsApi } from "../Api/News";


export const useGetNews=()=>{
    const {data:NewsData,isLoading,isError}=useQuery({
        queryKey:["news"],
        queryFn:async ()=>{
            const response = await GetNewsApi();
            return Array.isArray(response?.output) ? response.output : [];
        }
    })

    return { NewsData, isLoading, isError };
}