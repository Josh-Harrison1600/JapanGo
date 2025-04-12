import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, loading } = useAuth();

    //load while checking cookie
    if(loading){
        return(
            <div className="flex items-center justify-center h-screen">
                <p className="text-black text-center text-3xl mt-24 font-bold">Loading...</p>
            </div>
        )
    }

    //if user isnt authenticated redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />;
    }

    return <>{children}</>;
}