import { Link, NavLink } from "react-router-dom";
import Logo from "../images/JgoLogo.png";

function NavBar() {
    return(
        <nav className="bg-[#010b1c] shadow-md p-4 flex items-center">
            <Link to ="/" className="flex items-center">
                <img src={Logo} alt="Japan Go" className="h-10 w-auto mr-3 ml-4" />
            </Link>
            <div className="space-x-4 ml-8">
            
            {/* Navigations for Home, Menu, & Contact */}
            <NavLink 
                to="/" 
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