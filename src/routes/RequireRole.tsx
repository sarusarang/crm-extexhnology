import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";




export default function RequireRole({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {

    const { userType } = useAuth();
    const location = useLocation();

    if (!userType || !allowedRoles.includes(userType)) {

        toast.error("Oops..!", { description: `You are not authorized to access this page.`, duration: 5000 });
        
        // 👇 send them back to where they came from
        const fallback = location.state?.from?.pathname || "/";
        return <Navigate to={fallback} replace />;
    
    }

    return <>{children}</>;

}
