export type RegisterUserRequest = {
  username: string;
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  id?: number;
  username: string;
  email: string;
  password?: string; 
};
