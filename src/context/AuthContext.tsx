import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";



// Define the JWT payload type
interface JwtPayload {
    exp?: number;
    [key: string]: any;
}



// Define the AuthContext type  
interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    getToken: () => string | null;
}



// Define the AuthProviderProps type
interface AuthProviderProps {
    children: React.ReactNode;
}



// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);




// Define the getToken function
const getToken = (): string | null => {

    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload: JwtPayload = jwtDecode(token);
        if (typeof payload.exp === "number" && payload.exp * 1000 > Date.now()) {
            return token;
        }
    } catch {
        // Invalid or malformed token
    }
    return null;
};




//  Define the checkAuth function
const checkAuth = (): boolean => !!getToken();





export const AuthProvider = ({ children }: AuthProviderProps) => {


    // Define the navigate function
    const navigate = useNavigate();


    // Login state
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());



    // Define the syncAuth function
    const syncAuth = useCallback(() => {
        setIsAuthenticated(checkAuth());
    }, []);




    // Add event listeners
    useEffect(() => {

        const handleStorageChange = () => syncAuth();
        const handleAuthChanged = () => syncAuth();

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("authChanged", handleAuthChanged);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("authChanged", handleAuthChanged);
        };

    }, [syncAuth]);




    // Define the logout function
    const logout = useCallback(() => {

        if (!isAuthenticated) {
            toast("You are alredy Logged out Click to Login", { action: { label: "Login", onClick: () => navigate("/auth") }, duration: 8000 });
            return;
        }

        localStorage.removeItem("token");
        setIsAuthenticated(false);
        window.dispatchEvent(new CustomEvent("authChanged"));
        toast.success("Logout Success", { description: "You have successfully Logged out", duration: 5000 })
    }, []);




    // Define the login function
    const login = useCallback((token: string) => {
        try {
            const payload: JwtPayload = jwtDecode(token);
            if (typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now()) {
                throw new Error("Invalid or expired token");
            }
            localStorage.setItem("token", token);
            setIsAuthenticated(true);
            window.dispatchEvent(new CustomEvent("authChanged"));
        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Invalid login token Try again."); // Optional toast
        }
    }, []);




    // Define the logout function for session expiration
    useEffect(() => {

        const token = getToken();
        if (!token) return;

        try {
            const payload: JwtPayload = jwtDecode(token);
            if (payload.exp) {

                const timeLeft = payload.exp * 1000 - Date.now();

                if (timeLeft <= 0) {
                    logout();
                    toast("Session expired. Please log in again.", { action: { label: "Login", onClick: () => navigate("/auth") }, duration: 8000 });
                    return;
                }

                const timer = setTimeout(() => {
                    logout();
                    toast("Session expired. Please log in again.", { action: { label: "Login", onClick: () => navigate("/auth") }, duration: 8000 });
                }, timeLeft);

                return () => clearTimeout(timer);
            }
        } catch {
            logout();
        }

    }, [isAuthenticated, logout]);




    const contextValue = useMemo(() => ({ isAuthenticated, login, logout, getToken }),
        [isAuthenticated, login, logout]
    );



    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );


};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
