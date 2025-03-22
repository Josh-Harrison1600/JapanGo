import { useAuth } from '../contexts/AuthContext';

function Login() {
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    }

    return(
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-md">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        className="border px-3 py-2 w-full"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="border px-3 py-2 w-full"
                    />
                    <button type="submit" className='bg-black text-white px-4 py-2'>
                        Login
                    </button>
                </form>
        </div>
    )
}

export default Login;