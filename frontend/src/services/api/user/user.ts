import axiosInstance from "@/config/axios-instance";
import { UserApis } from "@/types/auth";
import { UserResponse } from "@/types/user";


export const userApis:UserApis = {
    query:{
        useUser:{
            queryKey: ['user'],
            queryFn:async()=>{
                const response = await axiosInstance.get<UserResponse>('/auth/user-info/');
                return response.data;
            }
        }
    },
    mutate:{}
}