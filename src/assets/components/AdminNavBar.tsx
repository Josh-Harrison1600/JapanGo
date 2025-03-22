import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

function AdminNavBar() {
    const { logout } = useAuth();

    return(
        <nav className='bg-black text-white flex justify-between items-center px-6 py-4'>
            <div className='font-bold text-xl'>Admin Dashboard</div>
                <div className='flex space-x-4'>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <button onClick={logout}>Logout</button>
                </div>
        </nav>
    )
}

export default AdminNavBar;