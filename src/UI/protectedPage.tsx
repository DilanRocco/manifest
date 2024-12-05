import { useEffect, useState } from "react";
import { authApi } from '@/services/auth';
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_STR } from "@/constants";
import Loading from "@/UI/loading";

type Props = {
    children: React.ReactNode;
}

const ProtectedProvider = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem(AUTH_TOKEN_STR);
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const isValid = await authApi.credentialsValid();
                if (isValid) {
                    const userId = await authApi.uuid();
                    sessionStorage.setItem("userId", userId);
                    setIsAuthenticated(true);
                } else {
                    throw new Error("Invalid credentials");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem(AUTH_TOKEN_STR);
                sessionStorage.removeItem("userId");
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <Loading />;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
}

export default ProtectedProvider;