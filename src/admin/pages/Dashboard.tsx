import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DashboardPage() {
  //Get auth info from context
  const { isAuthenticated, loading } = useAuth();

  const [visits, setVisits] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
    try{
      const res = await axios.get('http://localhost:5000/analytics/monthly');
      setVisits(res.data.visitsThisMonth);
    }catch(err){
      console.error('Error fetching visits', err);
      setError('Failed to fetch visits data');
    }
  }
    fetchAnalytics();
}, [])

  //While the auth check is still running, show a loading screen
  if(loading){
    return <div className='text-center p-8 text-3xl font-bold text-black'>Loading...</div>;
  }

  //If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-black">Analytics Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      {visits !== null ? (
        <p className="text-lg text-black">Visits this month: <strong>{visits}</strong></p>
      ) : (
        <p className="text-black">Loading analytics...</p>
      )}
    </div>
  );
}

export default DashboardPage;
