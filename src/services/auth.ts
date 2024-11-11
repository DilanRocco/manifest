
import { SignupData, LoginData } from '@/types/auth';
import { AuthResponse, createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { supabase } from '@/services/client';



const AUTH_TOKEN_STR = import.meta.env.VITE_AUTH_TOKEN_STR

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const authApi = {
  
  async signup(userData: SignupData): Promise<boolean> {
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: userData.email,
          password: userData.password,
        }
      ) 

      if (error) {
        throw new ApiError(
          error.message || 'Login failed',
          error.status || 0,
          error.code
        );
      }
      const authToken = data.session?.access_token;
        if (authToken) {
          localStorage.setItem(AUTH_TOKEN_STR, authToken);
        }
      return true  
    } catch (error) {
      throw new ApiError("Error occured", 404);
    }
  },

  async login(credentials: LoginData) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        throw new ApiError(
          error.message || 'Login failed',
          error.status,
          error.code
        );
      }
      const authToken = data.session?.access_token;
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_STR, authToken);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },

  async signout() {
    try {
      const { error } = await supabase.auth.signOut()
    if (error) {
      throw new ApiError(
        error.message || 'Login failed',
        error.status,
        error.code
      );
    } else {
      localStorage.setItem(AUTH_TOKEN_STR, "");
    }


    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },

  async credentialsValid(): Promise<boolean> {
    const token = localStorage.getItem(AUTH_TOKEN_STR) 
    if (!token) {
      return false
    }
    try {
      const { data, error } = await supabase.auth.getUser(
        token
    )
    if (error) {
      return false
    }

    if (data.user) {
      return true
    } else {
      return false
    }

    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },
 

};