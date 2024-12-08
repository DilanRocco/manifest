import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { supabase } from '@/services/client';
import { session } from 'passport';

interface AuthState {
    session: Session | null;
    user: User | null;
    isAuthenticated: boolean;
  }
  
  interface AuthContextType extends AuthState {
    currentEvent: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPasswordForEmail: (email: string, redirectTo: string) => Promise<void>;
    changePassword: (password: string) => Promise<void>;
    refreshSession: () => Promise<void>;
    getToken: () => string
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  interface AuthProviderProps {
    children: ReactNode;
  }

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>({
      session: null,
      user: null,
      isAuthenticated: false,
    });
  
    const [currentEvent, setCurrentEvent] = useState<string | null>(null);

    useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setAuthState({
        session,
        user: session?.user ?? null,
        isAuthenticated: !!session,
      });
    }
    fetchSession()
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setCurrentEvent(event);
          setAuthState({
            session,
            user: session?.user ?? null,
            isAuthenticated: !!session,
          });
        }
      );
  
      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, []);

    const signup = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        const session = data.session
        const user = data.user
        if (error) throw error;
        setAuthState({
          session,
          user,
          isAuthenticated: true,
        });
      };
  
    const login = async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      const session = data.session
      const user = data.user
      if (error) throw error;
      setAuthState({
        session,
        user,
        isAuthenticated: true,
      });
    };
    
    const logout = async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setAuthState({
        session: null,
        user: null,
        isAuthenticated: false,
      });
    };

    const changePassword = async (passsword: string) => {
      const { data, error } = await supabase.auth
      .updateUser({ password: passsword })
      if (error) throw error
      setAuthState({
        session: null,
        user: null,
        isAuthenticated: false,
      });
    }
    const resetPasswordForEmail = async (email: string, redirectTo: string) => {
      const {data, error} = await supabase.auth.resetPasswordForEmail(email, {redirectTo: redirectTo})
      if (error) throw error
    } 

    const getToken = () => {
        return authState.session?.access_token ?? ""
    }

    const refreshSession = async () => {
      const { data: { user, session }, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      if (user && session) {
        setAuthState({
          session,
          user,
          isAuthenticated: true,
        });
      }
    };
  
    return (
      <AuthContext.Provider value={{ currentEvent, ...authState, login, signup, logout, resetPasswordForEmail, changePassword, refreshSession, getToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  
  