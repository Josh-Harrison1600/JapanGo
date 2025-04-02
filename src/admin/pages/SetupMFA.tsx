import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function SetupMFA() {
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  useEffect(() => {
    // Call backend to generate MFA secret and QR
    const fetchQRCode = async () => {
      const res = await fetch('http://localhost:5000/mfa/generate-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) setQrCode(data.qrCode);
      else toast.error(data.error || 'Failed to generate QR code');
    };

    if (email) fetchQRCode();
  }, [email]);

  const handleVerify = async () => {
    const res = await fetch('http://localhost:5000/auth/verify-mfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      toast.success('MFA verified successfully!');
      navigate('/admin/dashboard');
    } else {
      toast.error(data.message || 'Invalid code');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-6'>
      <h1 className='text-2xl font-bold mb-4'>Set up MFA</h1>
      <p className='mb-4 text-gray-600'>Scan the QR code below with your Authenticator app and enter the 6-digit code.</p>
      
      {qrCode && <img src={qrCode} alt="Scan QR for MFA" className='mb-4' />}

      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter 6-digit code"
        className="border p-2 mb-4 w-full max-w-sm"
      />

      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Verify
      </button>
    </div>
  );
}

export default SetupMFA;
