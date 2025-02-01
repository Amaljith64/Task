import { UseQueryOptions } from '@tanstack/react-query';
import { UserResponse } from './user';

export interface UserInfo {
    id: number;
    email: string;
    username: string;
    name: string;
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
  useUser: UseQueryOptions<UserResponse, Error, UserResponse, string[]>
}

  export interface UserApis{
    query:UserQueryList,

}