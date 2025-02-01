import { UseQueryOptions } from '@tanstack/react-query';

export interface UserInfo {
    id: number;
    email: string;
    username: string;
  }
  
  export interface TokenResponse {
    access: string;
    refresh: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    username: string;
  }


export interface UserQueryList{
  useUser:UseQueryOptions<any,any,any,any>
}

  export interface UserApis{
    query:UserQueryList,
    mutate:any
}