import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../images/JgoLogo.png";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return(
        <nav className="bg-[#010b1c] shadow-md p-4 flex items-center">
            <Link to ="/" className="flex items-center">
                <img src={Logo} alt="Japan Go" className="h-10 w-auto mr-3 ml-4" />
            </Link>

            {/* Hamburger menu (mobile only) */}
            <div className="md:hidden mr-4">
                <button onClick={toggleMenu}>
                    {/* hamburger icon */}
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >               
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    </svg>        
                </button>

            </div>

            
            {/* Navigations for Home, Menu, & Contact */}
            <div
                className={`flex-col md:flex md:flex-row md:items-center md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-[#010b1c] md:bg-transparent 
                ${menuOpen ? "flex" : "hidden"
                }`}
            >
            <NavLink 
                to="/" 
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                    `font-bold text-2xl mr-8 duration-300 transition-all ${
                    isActive ? 'text-red-500' : 'text-white hover:text-red-500'
                    }`
                }
                >
                Home
                </NavLink> 

                <NavLink 
                to="/Shop" 
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                    `font-bold text-2xl mr-8 duration-300 transition-all ${
                    isActive ? 'text-red-500' : 'text-white hover:text-red-500'
                    }`
                }
                >
                Menu
                </NavLink>

                <NavLink 
                    to="/contact-us"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                        `font-bold text-2xl mr-8 duration-300 transition-all ${
                        isActive ? 'text-red-500' : 'text-white hover:text-red-500'
                        }`
                    }
                    >
                    Contact Us
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;