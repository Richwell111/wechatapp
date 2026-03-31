import { Navigate } from "react-router-dom";
import { authClient } from "../../lib/auth-client"
import LoadingScreen from "../loading/LoadingScreen";

interface ProtectedRoutesProps {
    children:React.ReactNode
}

export default function ProtectedRoutes({children}:ProtectedRoutesProps) {
    const {data:session,isPending} = authClient.useSession();

    if(isPending){
        return <LoadingScreen/>
    }

    if(!session){
        return <Navigate to="/" replace/>
    }
  

    return <>{children}</>
}