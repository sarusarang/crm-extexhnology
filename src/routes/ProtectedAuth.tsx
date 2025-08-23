import { useAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import { toast } from "sonner"
import { useLocation, Navigate } from "react-router-dom"


export default function ProtectedAuth({ children }: { children: React.ReactNode }) {



    // to get current location
    const location = useLocation()



    // get auth context
    const { isAuthenticated } = useAuth()



    // Show a toast if not authenticated
    useEffect(() => {

        if (!isAuthenticated) {
            toast.error("Oops..!", { description: "You are not logged in.", duration: 5000 })
        }

    }, [isAuthenticated])




    // if not authenticated, redirect to login page
    if (!isAuthenticated) {

        return <Navigate to={'/auth'} state={{ from: location }} replace />

    }


    
    // if authenticated, render children
    return <>{children}</>

  
}
