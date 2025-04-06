import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function VerifyEmailCode(){
    const [code, setCode] = useState('');
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    const navigate = useNavigate();

    //Get the info from the backend
    const handleVerify = async () => {
        const res = await fetch('http://localhost:5000/auth/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code }),
            credentials: 'include',
        });

        const data = await res.json();

        //If token is good login & redirect
        if(res.ok){
            toast.success('Login Successful!');
            navigate('/admin/dashboard');
        }else{
            toast.error(data.message || 'Invalid or Expired Code!')
        }
    };

    return(
        <div className='flex flex-col items-center justify-center min-h-screen p-6'>
            <h1 className='text-2xl font-bold mb-4'>Enter Verification Code:</h1>
            <p className='text-gray-600 mb-4'>A 6-digit code has just been sent to your email</p>
            <input 
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder='Enter 6-digit code'
                className='border p-2 mb-4 w-full max-w-sm'
            />
            <button
                onClick={handleVerify}
                className='bg-black text-white px-4 py-2 rounded hover:bg-gray-900 cursor-pointer'
            >
                Verify
            </button>
        </div>
    );
}

export default VerifyEmailCode;