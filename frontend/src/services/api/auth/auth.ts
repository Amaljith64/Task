import axiosInstance from "@/config/axios-instance";
import { LoginCredentials, RegisterCredentials, TokenResponse, UserInfo } from "@/types/auth";

export const registerUser = async (credentials: RegisterCredentials): Promise<TokenResponse>  => {
    try{
        const response = await axiosInstance.post("/auth/register/",credentials)

        return response.data
    }
    catch(error){
        throw new Error(`Registration failed: ${error}`);
    }
}

export const loginUser = async (credentials: LoginCredentials): Promise<TokenResponse>  =>{
    console.log(credentials,'from login fun');
    try{
        const response = await axiosInstance.post("/auth/login/",credentials)
        console.log(response,'rrrrrrrrrrrrrrrrrr');
        return response.data
    }
    catch (error) {
        console.log(error,'error');
        throw new Error(`Login failed: ${error}`)
    }
}

export const logoutUser = async (): Promise<void> =>{
    try{
        const response = await axiosInstance.post("/auth/logout/")

        return response.data
    }
    catch (error){
        console.log(error,'logout err');
        throw new Error( `Logout failed : ${error}`);
    }
}


export const getUserInfo = async () : Promise<UserInfo>=>{
    try{
        const response = await axiosInstance.get('/auth/user-info')
        console.log(response,'useeeeeeeeeee');

        return response.data
    }
    catch(error){
        console.log(error);
        throw new Error(`getting user failed : ${error}`)
    }
}

export const refreshToken = async (): Promise<TokenResponse> =>{
    try {
        const response = await axiosInstance.post('/auth/refresh/')

        return response.data
    }

    catch (error){
        console.log(error,'hhhhhh');
        throw new Error(`Refreshing token failed ${error}`);
    }
}
