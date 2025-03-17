import { Link } from "react-router-dom";
import Logo from "../images/JgoLogo.png";

function NavBar() {
    return(
        <nav className="bg-[#010b1c] shadow-md p-4 flex items-center">
            <Link to ="/" className="flex items-center">
                <img src={Logo} alt="Japan Go" className="h-10 w-auto mr-3 ml-4" />
            </Link>
            <div className="space-x-4 ml-8">
                <Link to="/" className="text-white font-bold text-2xl hover:text-red-500 duration-300 transition-all mr-8">Home</Link>
                <Link to="/Shop" className="text-white font-bold text-2xl hover:text-red-500 duration-300 transition-all mr-8">Menu</Link>
                <Link to="/contact-us" className="text-white font-bold text-2xl hover:text-red-500 duration-300 transition-all">Contact Us</Link>

            </div>
        </nav>
    )
}

export default NavBar;