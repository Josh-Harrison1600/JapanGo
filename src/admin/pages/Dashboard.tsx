import AdminNavBar from '../components/AdminNavBar';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

function DashboardPage() {
  //Get auth info from context
  const { isAuthenticated, loading } = useAuth();

  //While the auth check is still running, show a loading screen
  if(loading){
    return <div className='text-center p-8 text-3xl font-bold text-black'>Loading...</div>;
  }

  //If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  
  return (
    <div>
      <AdminNavBar />
    </div>
  );
}

export default DashboardPage;
