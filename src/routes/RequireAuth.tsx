import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";




export default function RequireAuth({ children }: { children: React.ReactNode }) {


    const { isAuthenticated } = useAuth();
    const location = useLocation();


    if (!isAuthenticated) {
        toast.error("Oops..!", { description: "You are not logged in.", duration: 5000 });
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }


    return <>{children}</>;

}
