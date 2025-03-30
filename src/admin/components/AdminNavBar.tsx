import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

function AdminNavBar() {
    //State to control sidebar opening and closing
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return(
        <>
            <nav className='bg-black text-white flex justify-between items-center px-6 py-4'>
                {/* Hamburger Icon */}
                <MenuIcon 
                    className='text-white cursor-pointer'
                    fontSize="large"
                    onClick={() => setSidebarOpen(true)}
                    />
                
            </nav>

            {/* This ensures navbar panel will stay on top */}
            {sidebarOpen && (
                <div
                    className='z-40'
                    onClick={() => setSidebarOpen(false)}>
                </div>
            )}

            {/* Sidebar Container */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            >
            {/* Close Icon at the Top */}
            <div className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
                <span className='text-xl font-semibold'>Admin Menu</span>
                <CloseIcon className='cursor-pointer' onClick={() => setSidebarOpen(false)} />
            </div>

            {/* Menu Items */}
            <div className='px-4 mt-4 space-y-4'>
                <div className='uppercase text-sm text-gray-400'>Home</div>
                <Link to='/admin/dashboard' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300'>
                    <HomeIcon fontSize='small' />
                    Dashboard
                </Link>

                <div className='uppercase text-sm text-gray-400 mt-6'>Apps</div>
                <Link to='/admin/menu' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300'>
                    <FastfoodIcon fontSize='small' />
                        Menu
                    </Link>

                <Link to='/admin/hours' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300'>
                    <WatchLaterIcon fontSize='small' />
                        Hours
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminNavBar;