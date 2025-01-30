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