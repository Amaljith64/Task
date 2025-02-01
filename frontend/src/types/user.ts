export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export type UserResponse = {
    user: User;
  };