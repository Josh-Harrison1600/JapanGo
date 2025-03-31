import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import DashboardIcon from '@mui/icons-material/Dashboard';

function AdminNavBar() {
    //State to control sidebar opening and closing
    const [sidebarOpen, setSidebarOpen] = useState(false);

    //Ref to track the sidebar element
    const sidebarRef = useRef<HTMLDivElement>(null);

    //Handle a click outside the sidebar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ){
                setSidebarOpen(false);
            }
        }

        if(sidebarOpen){
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen]);

    return(
        <>
            <nav className='bg-black text-white flex justify-between items-center px-6 py-4'>
                {/* Hamburger Icon */}
                <MenuIcon 
                    className='text-white cursor-pointer hover:text-red-400 '
                    fontSize="large"
                    onClick={() => setSidebarOpen(true)}
                    />
                
            </nav>

            {/* Sidebar Container */}
            <div
                ref={sidebarRef}
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
                <Link to='/admin/dashboard' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300' onClick={() => setSidebarOpen(false)}>
                    <DashboardIcon fontSize='small' />
                    Dashboard
                </Link>

                <Link to='/' target="_blank" className='flex items-center gap-2 hover:text-red-400 transition-all duration-300' onClick={() => setSidebarOpen(false)}>
                    <HomeIcon fontSize='small' />
                    Regular View
                </Link>

                <div className='uppercase text-sm text-gray-400 mt-6'>Apps</div>
                <Link to='/admin/menu' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300' onClick={() => setSidebarOpen(false)}>
                    <FastfoodIcon fontSize='small' />
                        Menu
                    </Link>

                <Link to='/admin/hours' className='flex items-center gap-2 hover:text-red-400 transition-all duration-300' onClick={() => setSidebarOpen(false)}>
                    <WatchLaterIcon fontSize='small' />
                        Hours
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AdminNavBar;