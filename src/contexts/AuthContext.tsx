import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

//Define the shape of your AuthContext
interface AuthContextType {
    isAuthenticated: boolean;
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

    //On load check if the token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);
        }
    }, []);

    //Login function that checks credentials
    const login = async (email: string, password: string): Promise<boolean> => {
        try{
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(response.ok && data.token){
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.error('Login error', err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
