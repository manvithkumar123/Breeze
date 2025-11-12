import axios from "axios"
const OW_API_KEY = import.meta.env.VITE_OW_API_KEY;


export const GetCordinates= async (cityName:string)=>{
    try{
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${OW_API_KEY}`)
    return response.data;
    }
    catch(error){
        return error;
    }
}
export const GetweeklyWeather=async (citylat:number,citylong:number,)=>{
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${citylat}&lon=${citylong}&units=metric&appid=${OW_API_KEY}`)
        return response.data
    }
    catch(error){
        return error;
    }
}