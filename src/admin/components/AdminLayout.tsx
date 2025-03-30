import { Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';

function AdminLayout(){
    return(
        <div>
            <AdminNavBar />

            <main className='p-4'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;