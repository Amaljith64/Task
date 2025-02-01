import { refreshToken } from "@/services/api/auth/auth";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials:true
})

// Add a way to set cookies for server-side requests
export const setServerSideCookies = (cookieHeader:string) => {
    axiosInstance.defaults.headers.Cookie = cookieHeader;
};

// Helper to check if code is running on server
const isServer = typeof window === 'undefined';


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>{
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                if(isServer){
                    console.log('its server');
                    const response = await axiosInstance.post('/auth/refresh/');

                    const newCookies = response.headers['set-cookie']
                    console.log("new cookie: ",newCookies);
                    if (newCookies) {
                        // Update cookie header for subsequent requests
                        axiosInstance.defaults.headers.Cookie = newCookies.join('; ');
                    }
                }
                else{

                    await refreshToken();
                }

                return axiosInstance(originalRequest)
            }catch (refreshError){
                if (!isServer) {
                    window.location.href = '/auth/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance