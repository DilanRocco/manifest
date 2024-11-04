import { SignupData, LoginData, AuthResponse } from '@/types/auth';

const API_BASE_URL = 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const authApi = {
  async signup(userData: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Signup failed',
          response.status,
          data.code
        );
      }

      return data as AuthResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw error
      
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },

  async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new ApiError(
          data.message || 'Login failed',
          response.status,
          data.code
        );
      }

      return data as AuthResponse;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw error
      throw new ApiError('Network error occurred', 500, 'NETWORK_ERROR');
    }
  },
};