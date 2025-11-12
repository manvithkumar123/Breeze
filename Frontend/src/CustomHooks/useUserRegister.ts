import { useState } from "react";
import { useMutation} from "@tanstack/react-query";
import { RegisterApi } from "../Api/Users";
import { toast } from "react-toastify";

export const useUserRegister = () => {
    const [registerEmail,setRegisterEmail] =useState<string>("");
    const [registerUsername,setRegisterUsername]=useState<string>("");
    const [registerpassword,setRegisterPassword]=useState<string>("");

    const {
        mutate : registerUser,
        data:UserData,isPending,isError,isSuccess}=useMutation({
        mutationFn:async()=>{
            const response = await RegisterApi(registerEmail,registerUsername,registerpassword);
            return response;
        },
        onSuccess:(data)=>{
            if (data.status === "success") toast.success(data?.output);
            else toast.error(data?.output);
        },
        onError: (error: any) => {
              toast.error(error.message || "Login failed");
        }
        })
    return{
        UserData,isPending,isError,isSuccess,registerUser,
        setRegisterEmail,setRegisterPassword,setRegisterUsername,
        registerEmail,registerUsername,registerpassword
    }
    }

