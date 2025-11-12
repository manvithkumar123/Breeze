import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginApi } from "../Api/Users";
import { toast } from "react-toastify";

export const useUserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutate: loginUser,
    data: loginResponse,isPending,error,isSuccess} = useMutation({
    mutationFn: async () => {
      const response = await LoginApi(email, password);
      return response;
    },
    onSuccess: (data) => {
      if (data.status === "success") toast.success(data?.output);
      else toast.error(data?.output);
    },
    onError: (error: any) => {
      toast.error(error.message || "Login failed");
    }
  });
  
  const loading = isPending;
  const success = isSuccess;
  return {email,setEmail,password,setPassword,loginUser,loginResponse,isPending,error,loading,isSuccess};
};