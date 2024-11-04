import { type User } from '@supabase/supabase-js';

export type AuthUser = User | null;

export interface AuthError {
  message: string;
}