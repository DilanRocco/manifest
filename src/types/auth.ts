export interface SignupData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  createdAt: string;
}
export interface Token {
  access_token: string
}
export interface AuthResponse {
  session: Token
  user: User;
}

