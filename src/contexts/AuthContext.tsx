import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

//Define the shape of your AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

//Create the context with a default of null
const AuthContext = createContext<AuthContextType | null>(null);

//Export custom hook for consuming auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// AuthProvider wraps your app and provides auth state/actions
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    //On load check if the token exists
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:5000/auth/check', {
                    credentials: 'include', //includes cookies <-
                });
    
                const data = await res.json();
    
                //If authenticated, set state to true
                if (data.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.error('Session check failed:', err);
                setIsAuthenticated(false);
            }finally{
                setLoading(false);
            }
        };
    
        checkAuth();
    }, []);

    //Login function that checks credentials
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', 
            });
        
            if (response.ok) {
                setIsAuthenticated(true);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Login error', err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:5000/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });
        } catch (err) {
            console.error('Logout error', err);
        }
    
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

