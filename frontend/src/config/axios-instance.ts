import { refreshToken } from "@/services/api/auth/auth";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://localhost:8001/server/v1/',
    withCredentials:true
})

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

// Add a way to set cookies for server-side requests
export const setServerSideCookies = (cookieHeader:string) => {
    axiosInstance.defaults.headers.Cookie = cookieHeader;
};


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                await refreshToken();

                return axiosInstance(originalRequest)
            }catch (refreshError){
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance