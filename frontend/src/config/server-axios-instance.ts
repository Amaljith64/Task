import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Type for configuration
interface ServerAxiosConfig {
  baseURL: string;
  timeout?: number;
}

// Create configuration object
const config: ServerAxiosConfig = {
  baseURL: 'http://backend:8001/server/v1/',
  timeout: 10000
}

const serverAxiosInstance = axios.create({
  ...config,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Improved cookie handling
export const setServerSideCookies = (cookieHeader: string) => {
  if (cookieHeader) {
    serverAxiosInstance.defaults.headers.Cookie = cookieHeader;
  }
};

// Helper function to handle refresh token
const handleTokenRefresh = async () => {
  const response = await serverAxiosInstance.post('/auth/refresh/');
  const newCookies = response.headers['set-cookie'];
  
  if (newCookies) {
    serverAxiosInstance.defaults.headers.Cookie = newCookies.join('; ');
  }
  
  return response;
};

serverAxiosInstance.interceptors.request.use(
  async (config) => {
    // Ensure fresh cookies on each request
    const cookieStore = await cookies();
    const cookieString = cookieStore.getAll()
      .map(cookie => `${cookie.name}=${cookie.value}`)
      .join('; ');
    
    setServerSideCookies(cookieString);
    return config;
  },
  (error) => Promise.reject(error)
);

serverAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (!originalRequest || !error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await handleTokenRefresh();
        return serverAxiosInstance(originalRequest);
      } catch (refreshError) {
        // You might want to handle specific refresh errors differently
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default serverAxiosInstance;