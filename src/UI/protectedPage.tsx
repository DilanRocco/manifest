import { useAuth } from "@/provider/authProvider";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProviderProps {
    children: ReactNode;
  }
  
export const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
    const { isAuthenticated, refreshSession } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const checkAuth = async () => {
        if (!isAuthenticated) {
          try {
            await refreshSession();
          } catch (error) {
            console.error('Session refresh failed:', error);
          }
        }
        setIsLoading(false);
      };
  
      checkAuth();
    }, [isAuthenticated, refreshSession]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };