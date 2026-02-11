import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from 'sonner';
import { useLocation, useNavigate } from "react-router-dom";
import type { AuthTokensResponse, UserType } from "@/types/project";



// Define the JWT payload type
interface JwtPayload {
    exp?: number;
    [key: string]: any;
}



// Define the AuthContext type  
interface AuthContextType {
    isAuthenticated: boolean;
    userName: string | null;
    userType: UserType | null;
    login: (response: AuthTokensResponse) => void;
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


    // Location
    const location = useLocation();


    // Login state
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
    const [userName, setUserName] = useState<string | null>(localStorage.getItem("name"));
    const [userType, setUserType] = useState<UserType | null>(localStorage.getItem("user_type") as UserType | null);



    // Define the syncAuth function
    const syncAuth = useCallback(() => {
        setIsAuthenticated(checkAuth());
        setUserName(localStorage.getItem("name"));
        setUserType(localStorage.getItem("user_type") as UserType | null);
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

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("user_type");

        if (!isAuthenticated) {
            toast("You are already logged out. Click to Login", {
                action: { label: "Login", onClick: () => navigate("/auth") },
                duration: 8000,
            });
            return;
        }

        setIsAuthenticated(false);
        setUserName(null);
        setUserType(null);

        window.dispatchEvent(new CustomEvent("authChanged"));
        toast.success("Logout Success", {
            description: "You have successfully logged out",
            duration: 5000,
        });

    }, [isAuthenticated, navigate]);





    // Define the login function
    const login = useCallback((response: AuthTokensResponse) => {

        try {

            const payload: JwtPayload = jwtDecode(response?.access);
            if (typeof payload.exp !== "number" || payload.exp * 1000 <= Date.now()) {
                toast.error("Invalid login token. Try again.");
                throw new Error("Invalid or expired token");
            }

            // Store in localStorage
            localStorage.setItem("token", response?.access);
            localStorage.setItem("name", response?.name);
            localStorage.setItem("user_type", response?.user_type);


            // Update state
            setIsAuthenticated(true);
            setUserName(response?.name);
            setUserType(response?.user_type);


            // Notify others
            window.dispatchEvent(new CustomEvent("authChanged"));


            toast.success("Login Success", { description: `You have successfully Logged in as ${response?.user_type.toUpperCase()}`, duration: 5000 })


            // ✅ Role-based redirect
            let redirectTo = "/";
            if (response?.user_type === "superadmin") {
                redirectTo = "/";
            } else if (response?.user_type === "admin") {
                redirectTo = "/projects";
            } else if (response?.user_type === "developer") {
                redirectTo = "/developer";
            }

            navigate(redirectTo, { replace: true });

        } catch (err) {

            console.error("Login failed:", err);
            toast.error("Invalid login token. Try again.");
       
        }
    }, [location, navigate]);





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




    const contextValue = useMemo(() => ({ isAuthenticated, userName, userType, login, logout, getToken }),
        [isAuthenticated, userName, userType, login, logout]
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
