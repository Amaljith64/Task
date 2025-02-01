
import axiosInstance from "@/config/axios-instance";
import { LoginCredentials, RegisterCredentials, TokenResponse, UserInfo } from "@/types/auth";
import axios from "axios";


export const registerUser = async (credentials: RegisterCredentials): Promise<TokenResponse> => {
    try {
        const { data } = await axios.post('/api/auth/register', credentials);
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Registration failed: ${error.message}`);
        } else {
            throw new Error('Registration failed: An unknown error occurred');
        }
    }
};

export const loginUser = async (credentials: LoginCredentials): Promise<TokenResponse> => {
    try {
        const { data } = await axios.post("/api/auth/login/", credentials)
        return data.data;;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Login failed: ${error.message}`);
        } else {
            throw new Error('Login failed: An unknown error occurred');
        }
    }
}

export const logoutUser = async (): Promise<void> => {
    try {
        const { data } = await axios.post("/api/auth/logout/")
        return data
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Logout failed: ${error.message}`);
        } else {
            throw new Error('Logout failed: An unknown error occurred');
        }
    }
}


export const getUserInfo = async (): Promise<UserInfo> => {
    try {
        const { data } = await axiosInstance.get('/auth/user-info')
        return data
    }
    catch (error) {
        throw new Error(`getting user failed : ${error}`)
    }
}

export const refreshToken = async (): Promise<TokenResponse> => {
    try {
        const { data } = await axiosInstance.post('/auth/refresh/')
        return data
    }
    catch (error) {
        throw new Error(`Refreshing token failed ${error}`);
    }
}
