import axios from "axios";

const apiKey = import.meta.env.VITE_API_URL;

export const LoginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiKey}/user/login`,
      { email, password },
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return error.response?.data || { output: "Unknown error", status: "failed" };
  }
};

export const RegisterApi = async (email:string,password:string,username:string)=>{
  try{
    const response = await axios.post(`${apiKey}/user/register`,{email,password,username})
    return response?.data
  }catch(error:any){
    return error.response?.data || { output: "Unknown error", status: "failed" };
  }
}

export const LogoutApi = async ()=>{
  try{
  const response = await axios.post(`${apiKey}/user/logout`,{},{withCredentials:true})
  return response;
  }catch(error:any){
    return error?.response?.data || { output: "Unknown error", status: "failed" }
  }

}