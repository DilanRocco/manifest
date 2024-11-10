
import { SignupData, LoginData } from '@/types/auth';
import { AuthResponse, createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();


const API_BASE_URL = 'http://localhost:3001';
const supabase = createClient(
  'https://dpqpapwghkhmczofddna.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcXBhcHdnaGtobWN6b2ZkZG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1ODA0MDcsImV4cCI6MjA0NjE1NjQwN30.H1bhZvJq1aT-1Q7bY570tPV7GH3J1orse1mHzjXJVQQ'
)

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
          localStorage.setItem('authToken', authToken);
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
        localStorage.setItem('authToken', authToken);
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
      localStorage.setItem('authToken', "");
    }


    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },

  async credentialsValid(): Promise<boolean> {
    const token = localStorage.getItem("authToken") 
    if (!token) {
      return false
    }
    try {
      const { data, error } = await supabase.auth.getUser(
        token
    )
    if (error) {
      throw new ApiError(
        error.message || 'Login failed',
        error.status,
        error.code
      );
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